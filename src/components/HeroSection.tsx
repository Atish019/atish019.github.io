import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import watermarkImg from '../assets/watermark.webp';
import profileImg from '../assets/profile.webp';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navItems = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#work' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'RESEARCH', href: '#research' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'CONTACT', href: '#contact' },
];

export const HeroSection: React.FC = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black cursor-none">
      {/* ================= 1. MINIMAL CUSTOM CURSOR ================= */}
      {cursorPos.x >= 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-[#D4AF37]/40 flex items-center justify-center backdrop-blur-[1px]"
          animate={{
            x: cursorPos.x - (isHovered ? 24 : 5),
            y: cursorPos.y - (isHovered ? 24 : 5),
            width: isHovered ? 48 : 10,
            height: isHovered ? 48 : 10,
            backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.1)' : 'rgba(235, 215, 195, 0.95)',
          }}
          transition={{ type: 'spring', damping: 30, stiffness: 350, mass: 0.5 }}
        />
      )}

      {/* ================= 2. FIXED PORTRAIT LAYER ================= */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black flex items-end justify-end">
        {/* Warm rim glow behind the subject */}
        <motion.div
          animate={{ opacity: [0.22, 0.4, 0.22], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-[10%] w-[38rem] h-[38rem] rounded-full bg-[#C99E5D]/25 blur-[150px]"
        />

        {/* The portrait: slow cinematic float + breathing scale */}
        <motion.img
          src={profileImg}
          alt="Atish Kumar Sharma"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{
            opacity: 1,
            scale: [1, 1.022, 1],
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative h-[92vh] md:h-[96vh] w-auto max-w-none object-contain object-bottom origin-bottom mr-[2vw] md:mr-[6vw] lg:mr-[9vw] drop-shadow-[0_0_60px_rgba(0,0,0,0.9)]"
        />

        {/* Slow gold light sweep across the subject */}
        <motion.div
          animate={{ x: ['-40%', '140%'] }}
          transition={{ duration: 9, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
          className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-r from-transparent via-[#D4AF37]/[0.07] to-transparent skew-x-12 mix-blend-screen"
        />

        {/* Seamless soft left edge blend so the headline stays readable */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black via-black/90 to-transparent" />

        {/* Grounding shadow at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

        {/* ================= 3. ANIMATED WATERMARK EMBLEM ================= */}
        <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-12 pointer-events-none flex items-center justify-center z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-36 h-36 bg-black/85 rounded-full blur-xl" />

            <motion.div
              animate={{
                y: [-3, 3, -3],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative flex items-center justify-center"
            >
              <img
                src={watermarkImg}
                alt="Insignia"
                className="w-28 h-28 lg:w-32 lg:h-32 object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================= 4. CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full px-6 sm:px-12 lg:px-16 pt-6 pb-8 pointer-events-none">

        {/* Navigation Bar */}
        <header className="relative flex items-center justify-between w-full pointer-events-auto">
          <a
            href="#"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#EAD8C7] hover:opacity-75 transition-opacity"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            IIITian ATISH
          </a>

          {/* Navigation Links */}
          <nav
            className="hidden lg:flex items-center space-x-6 xl:space-x-9 text-[10.5px] xl:text-[11px] tracking-[0.22em] xl:tracking-[0.26em] font-light uppercase text-[#C4B5A5] absolute left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group py-1 transition-colors duration-300 hover:text-[#FFF5EB]"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37]/50 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <a
            href="#contact"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group hidden sm:flex items-center space-x-2 text-[11px] tracking-[0.24em] font-light uppercase py-2 px-4 border border-[#8C6D4F]/50 hover:border-[#D4AF37] text-[#EAD8C7] transition-all duration-300 backdrop-blur-sm ml-auto lg:ml-0"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>LET&apos;S TALK</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
              ↗
            </span>
          </a>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:hidden flex flex-col justify-center items-end w-9 h-9 ml-4 group"
          >
            <span
              className={`block h-[1px] bg-[#EAD8C7] transition-all duration-300 ${menuOpen ? 'w-6 translate-y-[3px] rotate-45' : 'w-6'
                }`}
            />
            <span
              className={`block h-[1px] bg-[#EAD8C7] transition-all duration-300 mt-[5px] ${menuOpen ? 'w-6 -translate-y-[3px] -rotate-45' : 'w-4 group-hover:w-6'
                }`}
            />
          </button>
        </header>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 mt-3 mx-6 sm:mx-12 z-40 rounded-sm border border-[#8C6D4F]/40 bg-black/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] pointer-events-auto overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block px-6 py-4 text-[11px] tracking-[0.28em] font-light uppercase text-[#C4B5A5] border-b border-[#8C6D4F]/15 last:border-b-0 hover:bg-[#100D0B] hover:text-[#F7E7C4] transition-colors duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="block px-6 py-4 text-[11px] tracking-[0.28em] font-light uppercase text-[#F7E7C4] bg-[#16120E] hover:bg-[#1A1510] transition-colors duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                LET&apos;S TALK ↗
              </a>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Main Hero Row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full pt-4 pb-2 my-auto">

          {/* LEFT: Headline & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[37rem] xl:max-w-[40rem] pointer-events-auto z-20"
          >
            {/* Massive Condensed Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-3.5 select-none">
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[7.8rem] tracking-tight uppercase leading-[0.83]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                  I BUILD
                </span>

                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                  INTELLIGENT
                </span>

                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#DFBE8A] via-[#9B7640] to-[#342410] drop-shadow-[0_10px_30px_rgba(155,118,64,0.4)]">
                  SYSTEMS
                </span>
              </h1>
            </motion.div>

            {/* Subtitle Technologies */}
            <motion.div variants={fadeUpVariants} className="mb-4">
              <p
                className="text-[10px] sm:text-[11px] md:text-xs font-normal tracking-[0.28em] uppercase text-[#C4B29E]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                AI/ML ENGINEER <span className="text-[#8C6D4F] mx-1">•</span> GENERATIVE AI <span className="text-[#8C6D4F] mx-1">•</span> AI AGENTS
              </p>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[13.5px] font-light text-[#A8988B] leading-[1.8] tracking-wide max-w-lg mb-6 space-y-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>
                I design LLM applications, RAG pipelines, and multi-agent systems.
                <br />
                From fine-tuning to deployment — research turned into production-ready intelligence.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-row items-center gap-4 sm:gap-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <motion.a
                href="#work"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center space-x-3 px-6 sm:px-7 py-3.5 border border-[#8C6D4F] bg-[#120F0C]/80 hover:border-[#D4AF37] text-[#EAD8C7] hover:text-[#FFF5EB] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.18)]"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E8D7C5]/40 to-transparent pointer-events-none" />
                <span>EXPLORE MY WORK</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                  ↗
                </span>
              </motion.a>

              <motion.a
                href="https://github.com/Atish019"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 border border-[#8C6D4F]/40 hover:border-[#8C6D4F] text-[#BFA895] hover:text-[#EAD8C7] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300"
              >
                <span>GITHUB</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 text-xs">
                  ↗
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Floating Quote & Signature Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-start pointer-events-auto pr-24 xl:pr-36 mr-4 z-20 select-none"
          >
            <span className="text-xl text-[#C99E5D] leading-none font-serif mb-2">
              &ldquo;
            </span>

            <div
              className="text-[9.5px] font-medium tracking-[0.24em] uppercase text-[#E0D3C5] space-y-1 mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>MODELS ARE MY CRAFT.</p>
              <p>IMPACT IS MY METRIC.</p>
            </div>

            <div className="w-28 h-[1px] bg-gradient-to-r from-[#D4AF37] via-[#E8D7C5]/70 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.4)] mb-2" />

            <div
              className="text-[2.2rem] text-[#D8AB64] font-normal leading-none -ml-0.5"
              style={{
                fontFamily: "'Herr Von Muellerhoff', 'Allura', cursive",
                letterSpacing: '0.04em',
              }}
            >
              Atish
            </div>
          </motion.div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-2" />
      </div>
    </section>
  );
};

export default HeroSection;
