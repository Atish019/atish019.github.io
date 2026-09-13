// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Paste your Web3Forms access key here (get a free one at https://web3forms.com —
 * enter your email, and the key arrives in your inbox). The key is safe to commit:
 * it only allows sending mail TO you.
 *
 * Until it is replaced, the form gracefully falls back to opening the visitor's
 * mail client instead of silently pretending the message was sent.
 */
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

const EMAIL = 'atish.sharma6203@gmail.com';

const socials = [
  { label: 'GITHUB', href: 'https://github.com/Atish019' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/atish-kr-sharma-85a2972a7/' },
  { label: 'HUGGING FACE', href: 'https://huggingface.co/Atish020' },
  { label: 'KAGGLE', href: 'https://www.kaggle.com/atishshrma' },
];

type Status = 'idle' | 'sending' | 'sent' | 'error';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // No key configured yet — hand the message to the visitor's mail client.
    if (WEB3FORMS_ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      const subject = encodeURIComponent(`Portfolio enquiry from ${formData.name}`);
      const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio enquiry from ${formData.name}`,
          ...formData,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-ink text-fg-2 font-sans selection:bg-fg-3 selection:text-ink pt-16 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4 mb-5"
              >
                <span
                  className="text-[0.6875rem] font-medium tracking-[0.35em] uppercase text-gold"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  06 / CONTACT
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-gold/80 via-bronze/40 to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-fg via-fg-3 to-fg-5 drop-shadow-[0_4px_12px_rgba(var(--p-shadow-rgb),0.8)]">
                    OPEN FOR
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-grad-1 via-grad-2 to-grad-3 drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
                    COLLABORATION.
                  </span>
                </h2>
              </motion.div>

              <p
                className="text-xs sm:text-[0.8125rem] font-light text-fg-4 leading-relaxed max-w-md mb-10"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Have an AI system to design, a research idea worth prototyping, or an
                engineering role in mind? Send a direct dispatch below.
              </p>

              {/* Direct channels */}
              <div className="space-y-3 mb-10">
                <span className="block text-[0.59375rem] font-mono tracking-[0.2em] uppercase text-bronze">
                  // DIRECT
                </span>
                <a
                  href={`mailto:${EMAIL}`}
                  className="block text-sm text-fg-2 hover:text-gold transition-colors break-all"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {EMAIL}
                </a>

                <div className="pt-4">
                  <span className="block text-[0.59375rem] font-mono tracking-[0.2em] uppercase text-bronze mb-2">
                    // BASED IN
                  </span>
                  <span
                    className="text-sm text-fg-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Lucknow, India &middot; open to remote
                  </span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center space-x-2 px-4 py-2.5 text-[0.625rem] font-medium tracking-[0.2em] uppercase rounded-sm border border-bronze/40 bg-surface-1 text-fg-3 hover:border-gold hover:text-grad-1 transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span>{s.label}</span>
                    <span className="text-[0.5625rem] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Monolith Terminal Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative w-full rounded-sm border border-bronze/40 bg-surface p-8 sm:p-10 shadow-[0_20px_50px_rgba(var(--p-shadow-rgb),0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

            {/* Precision Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/60" />

            {status === 'sent' ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold text-gold text-sm">
                  ✓
                </div>
                <h3
                  className="text-3xl text-fg font-normal uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  PACKET DELIVERED
                </h3>
                <p
                  className="text-xs text-fg-4 font-light"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Transmission registered. I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="block text-[0.59375rem] font-mono tracking-[0.2em] uppercase text-bronze mb-2">
                      // SENDER
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full bg-surface-1 border border-bronze/30 focus:border-gold text-xs text-fg placeholder-bronze/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <span className="block text-[0.59375rem] font-mono tracking-[0.2em] uppercase text-bronze mb-2">
                      // CHANNEL
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full bg-surface-1 border border-bronze/30 focus:border-gold text-xs text-fg placeholder-bronze/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-[0.59375rem] font-mono tracking-[0.2em] uppercase text-bronze mb-2">
                    // PAYLOAD
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter transmission payload..."
                    className="w-full bg-surface-1 border border-bronze/30 focus:border-gold text-xs text-fg placeholder-bronze/50 p-4 outline-none rounded-sm transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                {status === 'error' && (
                  <p
                    className="text-[0.6875rem] text-rust"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Dispatch failed. Mail me directly at{' '}
                    <a href={`mailto:${EMAIL}`} className="underline hover:text-gold">
                      {EMAIL}
                    </a>
                    .
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 border border-bronze/50 bg-surface-1 hover:border-gold hover:bg-surface-2 disabled:opacity-50 disabled:cursor-not-allowed text-fg-2 hover:text-grad-1 text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(var(--p-shadow-rgb),0.5)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {status === 'sending' ? 'DISPATCHING...' : 'EXECUTE DISPATCH ↗'}
                </button>

              </form>
            )}
          </motion.div>

        </div>

        {/* System Footer Line */}
        <div className="pt-16 mt-16 border-t border-bronze/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <span className="text-[0.625rem] font-mono tracking-widest text-bronze uppercase">
            ATISH KUMAR SHARMA // AI &amp; ML ENGINEER
          </span>
          <span className="text-[0.625rem] font-mono text-bronze">
            © {new Date().getFullYear()} • BUILT &amp; DEPLOYED BY ATISH
          </span>
        </div>

      </div>
    </footer>
  );
};

export default ContactSection;
