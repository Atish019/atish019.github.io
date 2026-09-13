import { useEffect, useRef } from 'react';
import { Renderer, Geometry, Program, Mesh } from 'ogl';

/**
 * A WebGL constellation that sits behind the hero: drifting nodes with lines
 * drawn between the ones close enough to "fire", plus a gentle push away from
 * the cursor. It reads its colour from the live theme token, so the light and
 * dark palettes both get a field that belongs to them.
 *
 * Positions live in an aspect-corrected space (x spans -aspect..aspect, y
 * spans -1..1) so the drift looks the same speed in every direction; the
 * vertex shader divides x back down to clip space.
 */

const NODES = 130;
const LINK_DIST = 0.42; // in the aspect-corrected space above
const SPEED = 0.016; // units per second
const CURSOR_RADIUS = 0.42;
const CURSOR_PUSH = 0.55;

const POINT_VERT = /* glsl */ `
  attribute vec2 position;
  attribute float size;
  uniform float uAspect;
  uniform float uDpr;
  void main() {
    gl_Position = vec4(position.x / uAspect, position.y, 0.0, 1.0);
    gl_PointSize = size * uDpr;
  }
`;

const POINT_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(uColor, a * uAlpha);
  }
`;

const LINE_VERT = /* glsl */ `
  attribute vec2 position;
  attribute float alpha;
  uniform float uAspect;
  varying float vAlpha;
  void main() {
    vAlpha = alpha;
    gl_Position = vec4(position.x / uAspect, position.y, 0.0, 1.0);
  }
`;

const LINE_FRAG = /* glsl */ `
  precision mediump float;
  uniform vec3 uColor;
  uniform float uAlpha;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(uColor, vAlpha * uAlpha);
  }
`;

/** "212, 175, 55" -> [0.83, 0.69, 0.22]; falls back to the dark-theme gold. */
function readGlow(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--p-glow-rgb')
    .trim();
  const parts = raw.split(',').map((n) => Number(n.trim()));
  if (parts.length !== 3 || parts.some((n) => !Number.isFinite(n))) {
    return [212 / 255, 175 / 255, 55 / 255];
  }
  return [parts[0] / 255, parts[1] / 255, parts[2] / 255];
}

export function NeuralField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(2, window.devicePixelRatio || 1),
      });
    } catch {
      return; // no WebGL on this device — the hero simply renders without it
    }

    const gl = renderer.gl;
    gl.canvas.style.cssText = 'width:100%;height:100%;display:block';
    host.appendChild(gl.canvas);

    // --- node state -------------------------------------------------------
    const px = new Float32Array(NODES);
    const py = new Float32Array(NODES);
    const vx = new Float32Array(NODES);
    const vy = new Float32Array(NODES);
    const sizes = new Float32Array(NODES);
    let aspect = 1;

    for (let i = 0; i < NODES; i++) {
      px[i] = (Math.random() * 2 - 1) * 1.6;
      py[i] = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      vx[i] = Math.cos(a) * SPEED;
      vy[i] = Math.sin(a) * SPEED;
      sizes[i] = 2.0 + Math.random() * 4.0;
    }

    const pointPos = new Float32Array(NODES * 2);
    const pointGeo = new Geometry(gl, {
      position: { size: 2, data: pointPos },
      size: { size: 1, data: sizes },
    });

    // Worst case every pair links; in practice far fewer, so we draw a slice.
    const MAX_LINKS = NODES * 8;
    const linePos = new Float32Array(MAX_LINKS * 4);
    const lineAlpha = new Float32Array(MAX_LINKS * 2);
    const lineGeo = new Geometry(gl, {
      position: { size: 2, data: linePos },
      alpha: { size: 1, data: lineAlpha },
    });

    const glow = readGlow();
    const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';

    const shared = {
      uAspect: { value: 1 },
      uColor: { value: glow },
      uDpr: { value: Math.min(2, window.devicePixelRatio || 1) },
    };
    const pointAlpha = { value: 0.75 };
    const linkAlpha = { value: 0.5 };

    const pointProgram = new Program(gl, {
      vertex: POINT_VERT,
      fragment: POINT_FRAG,
      uniforms: { ...shared, uAlpha: pointAlpha },
      transparent: true,
      depthTest: false,
    });

    const lineProgram = new Program(gl, {
      vertex: LINE_VERT,
      fragment: LINE_FRAG,
      uniforms: { ...shared, uAlpha: linkAlpha },
      transparent: true,
      depthTest: false,
    });

    /** Dark theme glows additively; light theme would blow out, so it blends. */
    const applyTheme = () => {
      const light = isLight();
      const next = readGlow();
      shared.uColor.value = next;
      pointAlpha.value = light ? 0.45 : 0.9;
      linkAlpha.value = light ? 0.26 : 0.62;
      const dst = light ? gl.ONE_MINUS_SRC_ALPHA : gl.ONE;
      pointProgram.setBlendFunc(gl.SRC_ALPHA, dst);
      lineProgram.setBlendFunc(gl.SRC_ALPHA, dst);
    };
    applyTheme();

    const pointMesh = new Mesh(gl, { mode: gl.POINTS, geometry: pointGeo, program: pointProgram });
    const lineMesh = new Mesh(gl, { mode: gl.LINES, geometry: lineGeo, program: lineProgram });

    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // --- cursor -----------------------------------------------------------
    let cx = 10; // parked far off-field until the pointer actually moves
    let cy = 10;
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      if (!r.width || !r.height) return;
      cx = ((e.clientX - r.left) / r.width - 0.5) * 2 * aspect;
      cy = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      cx = 10;
      cy = 10;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave, { passive: true });

    // --- sizing -----------------------------------------------------------
    const resize = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      aspect = w / Math.max(1, h);
      shared.uAspect.value = aspect;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    // --- frame ------------------------------------------------------------
    let raf = 0;
    let last = performance.now();
    let running = true;

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const limX = aspect + 0.1;
      for (let i = 0; i < NODES; i++) {
        px[i] += vx[i] * dt;
        py[i] += vy[i] * dt;

        // drift away from the cursor, then ease back to the base speed
        const dx = px[i] - cx;
        const dy = py[i] - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 < CURSOR_RADIUS * CURSOR_RADIUS && d2 > 1e-6) {
          const d = Math.sqrt(d2);
          const f = ((CURSOR_RADIUS - d) / CURSOR_RADIUS) * CURSOR_PUSH * dt;
          px[i] += (dx / d) * f;
          py[i] += (dy / d) * f;
        }

        if (px[i] < -limX) px[i] = limX;
        else if (px[i] > limX) px[i] = -limX;
        if (py[i] < -1.1) py[i] = 1.1;
        else if (py[i] > 1.1) py[i] = -1.1;

        pointPos[i * 2] = px[i];
        pointPos[i * 2 + 1] = py[i];
      }
      pointGeo.attributes.position.needsUpdate = true;

      // link every pair that is close enough, fading with distance
      let links = 0;
      for (let i = 0; i < NODES && links < MAX_LINKS; i++) {
        for (let j = i + 1; j < NODES && links < MAX_LINKS; j++) {
          const dx = px[i] - px[j];
          if (dx > LINK_DIST || dx < -LINK_DIST) continue;
          const dy = py[i] - py[j];
          if (dy > LINK_DIST || dy < -LINK_DIST) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > LINK_DIST) continue;
          const a = 1 - d / LINK_DIST;
          const o = links * 4;
          linePos[o] = px[i];
          linePos[o + 1] = py[i];
          linePos[o + 2] = px[j];
          linePos[o + 3] = py[j];
          lineAlpha[links * 2] = a;
          lineAlpha[links * 2 + 1] = a;
          links++;
        }
      }
      // park the unused tail on top of itself so it draws nothing
      for (let k = links; k < MAX_LINKS; k++) {
        lineAlpha[k * 2] = 0;
        lineAlpha[k * 2 + 1] = 0;
      }
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.alpha.needsUpdate = true;
      lineGeo.setDrawRange(0, links * 2);

      renderer.render({ scene: lineMesh });
      renderer.render({ scene: pointMesh, clear: false });

      raf = requestAnimationFrame(frame);
    };

    if (reduced) {
      // one static frame — the constellation is still there, it just holds still
      frame(performance.now());
      running = false;
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(frame);
    }

    // pause while the tab is hidden so we stop burning a GPU in the background
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      themeObserver.disconnect();
      ro.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      gl.canvas.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none opacity-90"
    />
  );
}

export default NeuralField;
