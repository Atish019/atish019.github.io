// src/components/ExperienceSection.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface RouteStop {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
}

const journey: RouteStop[] = [
  {
    id: '01',
    year: 'AUG 2024 - 2026',
    title: 'M.SC. AI & ML',
    organization: 'IIIT LUCKNOW',
    description:
      'Postgraduate study focused on Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing (NLP), Computer Vision, Generative AI, Large Language Models (LLMs), Transformers, Retrieval-Augmented Generation (RAG), Reinforcement Learning, Data Structures & Algorithms, Data Mining, Big Data Analytics, MLOps, Model Deployment, Computer Networks, Database Management Systems, Cloud Computing, Software Engineering, and Advanced Backend Engineering.',
  },
  {
    id: '02',
    year: '2025',
    title: 'AI INTERN',
    organization: 'EDUNET FOUNDATION',
    description:
      'Built and deployed AI applications including LLM-based chatbots, RAG systems, and multi-agent applications using Python, Docker, PostgreSQL, DuckDB, vector databases, LangChain, and modern AI/LLM frameworks.',
  },
  {
    id: '03',
    year: '2025',
    title: 'AMAZON ML CHALLENGE - AIR 503',
    organization: 'AMAZON',
    description:
      'Secured Team All India Rank 503 in a nationwide machine learning competition.',
  },
  {
    id: '04',
    year: '2024',
    title: 'IIT JAM - AIR 1531',
    organization: 'IIT JAM MATHEMATICS',
    description:
      'Secured All India Rank 1531 in Mathematics among 15,000+ candidates.',
  },
  {
    id: '05',
    year: 'AUG 2019 - SEPT 2022',
    title: 'B.SC. MATHEMATICS (HONOURS)',
    organization: 'PATLIPUTRA UNIVERSITY, PATNA',
    description:
        'Undergraduate study in Mathematics covering Real Analysis, Linear Algebra, Abstract Algebra, Calculus, Differential Equations, Probability Theory, Numerical Analysis, Set Theory, Vector Analysis, Linear Programming, Number Theory, Analytical Geometry, and Mechanics.',
  },
];

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-ink text-fg-2 font-sans selection:bg-fg-3 selection:text-ink pt-4 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gold/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">

        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-gold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            05 / JOURNEY
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-gold/80 via-bronze/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-fg via-fg-3 to-fg-5 drop-shadow-[0_4px_12px_rgba(var(--p-shadow-rgb),0.8)]">
              EXPERIENCE &amp;
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-grad-1 via-grad-2 to-grad-3 drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              MILESTONES.
            </span>
          </h2>
        </motion.div>

        {/* Minimalist Route Map */}
        <div className="relative w-full">

          {/* Background Track */}
          <div className="absolute left-[19px] md:left-[140px] top-4 bottom-8 w-[1px] bg-bronze/20" />

          {/* Animated Gold Track */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] md:left-[140px] top-4 w-[2px] bg-gradient-to-b from-gold via-grad-2 to-bronze/10 shadow-[0_0_10px_var(--p-gold)] origin-top"
          />

          <div className="space-y-12">
            {journey.map((stop, idx) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="relative flex flex-col md:flex-row items-start group"
              >
                {/* Desktop Year (Left side of track) */}
                <div className="hidden md:block w-[140px] shrink-0 pr-8 pt-0.5 text-right">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-bronze group-hover:text-gold transition-colors">
                    {stop.year}
                  </span>
                </div>

                {/* Route Node */}
                <div className="absolute left-[19px] md:left-[140px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full border border-gold/0 group-hover:border-gold/40 group-hover:scale-150 transition-all duration-700 ease-out" />
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-1 border border-bronze group-hover:bg-gold group-hover:border-gold group-hover:shadow-[0_0_12px_var(--p-gold)] transition-colors duration-300" />
                </div>

                {/* Content (Right side of track) */}
                <div className="ml-14 md:ml-12 pl-2">
                  {/* Mobile Year */}
                  <div className="md:hidden mb-1.5">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-gold">
                      {stop.year}
                    </span>
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl tracking-wide text-fg group-hover:text-grad-1 transition-colors mb-1 leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {stop.title}
                  </h3>

                  <span
                    className="block text-[10px] font-medium tracking-[0.2em] uppercase text-bronze mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.organization}
                  </span>

                  <p
                    className="text-xs sm:text-[13px] font-light text-fg-4 leading-[1.7] max-w-lg group-hover:text-fg-3 transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;