// src/components/ResearchSection.tsx
import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface Paper {
  kind: string;
  status: string;
  title: string;
  institution: string;
  supervisor?: string;
  summary: string;
  contribution: string;
  facts: { label: string; value: string }[];
  stack: string[];
}

const papers: Paper[] = [
  {
    kind: 'RESEARCH PAPER',
    status: 'MANUSCRIPT PREPARED',
    title: 'Crop Ranking Using LSTM',
    institution: 'IIIT LUCKNOW',
    summary:
      'A soil- and environment-aware deep learning approach to crop advisory. A stacked LSTM learns the relationship between agronomic conditions and crop suitability across 22 categories, reaching 99.77% test accuracy.',
    contribution:
      'Proposed a probability-based ranking mechanism that converts softmax outputs into Top-K crop advisory lists — reporting performance above existing DCNN+LSTM and GCN-based approaches while additionally returning ranked recommendations rather than a single crop.',
    facts: [
      { label: 'ACCURACY', value: '99.77%' },
      { label: 'CLASSES', value: '22 Crops' },
      { label: 'DATASET', value: '2,200 Samples' },
      { label: 'FEATURES', value: '7 Parameters' },
    ],
    stack: ['LSTM', 'TensorFlow', 'Keras', 'Scikit-learn', 'Python'],
  },
  {
    kind: 'M.SC. THESIS',
    status: 'AI & ML — IIIT LUCKNOW',
    title: 'Crop Ranking System Based on Soil & Environment Conditions',
    institution: 'IIIT LUCKNOW',
    supervisor: 'Dr. Sushil Kumar Tiwari',
    summary:
      'Built a stacked LSTM model for multi-class crop suitability prediction across 22 crop categories, covering comprehensive EDA, correlation analysis, outlier handling, model development, evaluation, and ranking analysis.',
    contribution:
      'Designed a probability-to-ranking conversion module that transforms raw model predictions into ranked Top-K crop recommendations — turning a classifier into a practical advisory system for real agronomic decision-making.',
    facts: [
      { label: 'RESULT', value: '99.77%' },
      { label: 'RECORDS', value: '2,200 Agronomic' },
      { label: 'INPUTS', value: 'N·P·K·pH' },
      { label: 'SIGNALS', value: 'Temp·Humidity·Rain' },
    ],
    stack: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn', 'Pandas', 'Matplotlib'],
  },
];

const certifications = [
  { title: 'Data Science with Python', issuer: 'SIMPLILEARN' },
  { title: 'Machine Learning', issuer: 'SIMPLILEARN' },
  { title: 'Full Stack Web Development', issuer: 'UDEMY' },
  { title: 'Python + SQL — 110+ Exercises', issuer: 'UDEMY' },
];

const fromScratch = ['LLMs', 'GANs', 'ResNet', 'Inception', 'VGG16', 'Transformers'];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

export const ResearchSection: React.FC = () => {
  return (
    <section
      id="research"
      className="relative w-full bg-black text-[#E8DFD8] font-sans py-28 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient gold bloom */}
      <div className="absolute top-1/4 -left-40 w-[34rem] h-[34rem] rounded-full bg-[#8C6D4F]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-5"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            04 / RESEARCH
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              PUBLISHED THINKING.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              MEASURED RESULTS.
            </span>
          </h2>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-relaxed max-w-2xl mb-16"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Work that goes past the demo — formal research and a graduate thesis where the
          method, the baseline comparison, and the numbers all had to hold up.
        </motion.p>

        {/* Papers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {papers.map((paper, idx) => (
            <motion.article
              key={paper.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col p-8 sm:p-10 rounded-sm border border-[#8C6D4F]/35 bg-[#0D0A08]/90 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/70 hover:shadow-[0_20px_55px_rgba(212,175,55,0.13)]"
            >
              {/* Top gold horizon */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
              {/* Corner crosshairs */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/50 group-hover:border-[#D4AF37] transition-colors duration-300" />

              {/* Kind + status */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span
                  className="px-3 py-1.5 text-[9.5px] font-medium tracking-[0.22em] uppercase rounded-sm border border-[#D4AF37]/50 bg-[#16120E] text-[#F7E7C4]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {paper.kind}
                </span>
                <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#8C6D4F]">
                  {paper.status}
                </span>
              </div>

              <h3
                className="text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-wide text-white uppercase leading-[0.95] mb-5 group-hover:text-[#F7E7C4] transition-colors"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {paper.title}
              </h3>

              <p
                className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-[1.8] mb-6 group-hover:text-[#C4B5A5] transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {paper.summary}
              </p>

              {/* Contribution */}
              <div className="mb-7 pl-4 border-l border-[#D4AF37]/40">
                <span className="block text-[9.5px] font-mono tracking-[0.22em] uppercase text-[#8C6D4F] mb-2">
                  // CONTRIBUTION
                </span>
                <p
                  className="text-xs sm:text-[12.5px] font-light text-[#C4B5A5] leading-[1.8]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {paper.contribution}
                </p>
              </div>

              {/* Supervisor */}
              {paper.supervisor && (
                <div className="mb-7">
                  <span className="block text-[9.5px] font-mono tracking-[0.22em] uppercase text-[#8C6D4F] mb-1.5">
                    // SUPERVISOR
                  </span>
                  <span
                    className="text-xs text-[#E8D7C5]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {paper.supervisor} &middot; {paper.institution}
                  </span>
                </div>
              )}

              {/* Facts grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 border-y border-[#8C6D4F]/20 mb-7">
                {paper.facts.map((f) => (
                  <div key={f.label} className="flex flex-col">
                    <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[#8C6D4F] mb-1.5">
                      {f.label}
                    </span>
                    <span
                      className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] to-[#C99E5D] uppercase tracking-wide leading-none"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {paper.stack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/35 bg-[#171310] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* ================= CREDENTIALS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mt-24 mb-10"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            CREDENTIALS
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {certifications.map((c, idx) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
              className="group relative p-6 rounded-sm border border-[#8C6D4F]/30 bg-[#0D0A08]/70 hover:border-[#D4AF37]/60 transition-all duration-400"
            >
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors" />
              <span className="block text-[9px] font-mono tracking-[0.22em] uppercase text-[#8C6D4F] mb-2.5">
                {c.issuer}
              </span>
              <h4
                className="text-xl sm:text-2xl font-normal tracking-wide uppercase leading-tight text-[#E8DFD8] group-hover:text-[#F7E7C4] transition-colors"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {c.title}
              </h4>
            </motion.div>
          ))}
        </div>

        {/* From-scratch implementations */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative p-8 sm:p-10 rounded-sm border border-[#8C6D4F]/30 bg-gradient-to-br from-[#0D0A08] to-[#100D0B] overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <span className="block text-[9.5px] font-mono tracking-[0.22em] uppercase text-[#8C6D4F] mb-2">
                // BUILT FROM SCRATCH
              </span>
              <h4
                className="text-3xl sm:text-4xl font-normal tracking-wide uppercase leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                ARCHITECTURES, REIMPLEMENTED
              </h4>
              <p
                className="text-xs font-light text-[#A8988B] leading-relaxed max-w-lg mt-3"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Not imported &mdash; rebuilt layer by layer, to understand what the paper
                actually claims before trusting the library.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 lg:justify-end lg:max-w-sm">
              {fromScratch.map((f) => (
                <span
                  key={f}
                  className="px-4 py-2 text-[10px] font-medium tracking-[0.18em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#171310] text-[#E8D7C5] hover:border-[#D4AF37] hover:text-[#F7E7C4] transition-all duration-300"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ResearchSection;
