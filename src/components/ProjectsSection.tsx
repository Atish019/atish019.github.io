import React from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  tech: string[];
  metrics: { label: string; value: string }[];
}

interface SideProject {
  number: string;
  title: string;
  category: string;
  description: string;
  githubUrl: string;
  tech: string[];
}

interface ArchiveProject {
  number: string;
  title: string;
  category: string;
  githubUrl: string;
  tech: string[];
}

const projects: Project[] = [
  {
    number: '01',
    title: 'A2A Protocol',
    category: 'AI AGENTS / MULTI-AGENT SYSTEMS',
    description:
      'A multi-agent system implementing the A2A Protocol to let AI agents discover, communicate, and collaborate through JSON-RPC over HTTP. Agent Cards describe each agent’s capabilities, while Bearer Token authentication secures every agent-to-agent exchange.',
    githubUrl: 'https://github.com/Atish019/a2a-protocol',
    tech: ['Python', 'A2A Protocol', 'JSON-RPC', 'HTTP', 'Agent Cards', 'Bearer Auth'],
    metrics: [
      { label: 'TRANSPORT', value: 'JSON-RPC / HTTP' },
      { label: 'DISCOVERY', value: 'Agent Cards' },
      { label: 'SECURITY', value: 'Bearer Tokens' },
    ],
  },
  {
    number: '02',
    title: 'Post-Discharge Medical AI Assistant',
    category: 'GENERATIVE AI / MULTI-AGENT RAG',
    description:
      'An intelligent multi-agent system built for post-discharge nephrology patient care. LangGraph agent workflows are combined with retrieval-augmented generation, vector search, and LLMs to deliver context-aware medical guidance grounded in real clinical documents.',
    githubUrl: 'https://github.com/Atish019/Post-Discharge-Medical-AI-Assistant',
    tech: [
      'Python',
      'LangGraph',
      'LangChain',
      'Groq API',
      'ChromaDB',
      'SQLite',
      'FastAPI',
      'Docker',
      'HF Spaces',
    ],
    metrics: [
      { label: 'ORCHESTRATION', value: 'LangGraph Agents' },
      { label: 'RETRIEVAL', value: 'ChromaDB RAG' },
      { label: 'DEPLOYMENT', value: 'Docker / HF Spaces' },
    ],
  },
  {
    number: '03',
    title: 'SciSynth-AI',
    category: 'AI AGENTS / RESEARCH ASSISTANT',
    description:
      'An AI research assistant that runs a team of specialized agents to search, analyze, and synthesize academic papers from arXiv. It identifies open research directions, generates new ideas, and compiles complete papers with mathematical equations rendered in LaTeX.',
    githubUrl: 'https://github.com/Atish019/SciSynth-AI',
    tech: ['Python', 'LangChain', 'LangGraph', 'arXiv API', 'Streamlit', 'Tectonic'],
    metrics: [
      { label: 'CORPUS', value: 'Live arXiv API' },
      { label: 'PIPELINE', value: 'Multi-Agent Synthesis' },
      { label: 'OUTPUT', value: 'LaTeX Papers' },
    ],
  },
  {
    number: '04',
    title: 'Gemma-2B LoRA Fine-tuning',
    category: 'LLM FINE-TUNING / GENERATIVE AI',
    description:
      'Supervised fine-tuning of Google’s Gemma-2-2B on an English quotes dataset using LoRA. The project demonstrates memory-efficient LLM adaptation through low-rank parameter updates and 4-bit quantization — full-quality results on a single consumer GPU.',
    githubUrl: 'https://github.com/Atish019/Gemma2b-LoRA-Finetuning-Quotes',
    tech: ['Python', 'PyTorch', 'Hugging Face', 'Gemma-2-2B', 'LoRA', 'PEFT', '4-bit Quantization'],
    metrics: [
      { label: 'BASE MODEL', value: 'Gemma-2-2B' },
      { label: 'METHOD', value: 'LoRA + PEFT' },
      { label: 'PRECISION', value: '4-bit Quantized' },
    ],
  },
];

const sideProjects: SideProject[] = [
  {
    number: '05',
    title: 'Butterfly Semantic Segmentation',
    category: 'COMPUTER VISION / DEEP LEARNING',
    description:
      'A U-Net segmentation system performing pixel-level separation of butterflies from their backgrounds, served through an inference API with an interactive mask-visualization frontend.',
    githubUrl:
      'https://github.com/Atish019/butterfly-semantic-segmentation-UNET--Computer-Vision-',
    tech: ['U-Net', 'FastAPI', 'Docker', 'HF Spaces'],
  },
  {
    number: '06',
    title: 'Agriculture AI Crop Ranking',
    category: 'MACHINE LEARNING / DEEP LEARNING',
    description:
      'An LSTM-based crop ranking engine that reads soil nutrients (N, P, K) and environmental signals — temperature, humidity, pH, rainfall — to recommend suitable crops. 99.77% validation accuracy across 22 crop categories.',
    githubUrl: 'https://github.com/Atish019/agriculture-ai-crop-ranking-system',
    tech: ['LSTM', 'Scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    number: '07',
    title: 'RAG Q&A Conversation',
    category: 'GENERATIVE AI / RAG',
    description:
      'A conversational RAG application where users upload PDFs, retrieve relevant document context, and chat with their documents across session-based conversations with persistent history.',
    githubUrl: 'https://github.com/Atish019/RAG-Q-A-Conversation',
    tech: ['LangChain', 'ChromaDB', 'Groq', 'Streamlit'],
  },
  {
    number: '08',
    title: 'Custom YOLOv11 Object Detection',
    category: 'COMPUTER VISION / MLOPS',
    description:
      'An end-to-end custom object detection system covering model training, inference API development, Docker containerization, and production deployment on AWS.',
    githubUrl: 'https://github.com/Atish019/Custom_Training_YOLOv11_From_Scratch',
    tech: ['YOLOv11', 'FastAPI', 'Docker', 'AWS'],
  },
  {
    number: '09',
    title: 'Credit Card Fraud Detection',
    category: 'MACHINE LEARNING / MLOPS',
    description:
      'An end-to-end fraud detection pipeline that handles severe class imbalance with SMOTE and benchmarks multiple models. XGBoost reached 97.61% accuracy, tracked through MLflow and shipped as a Dockerized dashboard.',
    githubUrl: 'https://github.com/Atish019/credit_card_fraud_detection',
    tech: ['XGBoost', 'MLflow', 'DVC', 'Docker'],
  },
  {
    number: '10',
    title: 'AI Lecture Transcriber',
    category: 'GENERATIVE AI / NLP',
    description:
      'Turns any YouTube lecture into structured, subject-specific study notes by pairing transcript extraction with Google Gemini summarisation — hours of video compressed into readable revision material.',
    githubUrl: 'https://github.com/Atish019/AI_Lecture_Transcriber_YouTube_to_Notes_Converter',
    tech: ['Google Gemini', 'YouTube API', 'Streamlit'],
  },
];

const archiveProjects: ArchiveProject[] = [
  {
    number: '11',
    title: 'AI-Powered RAG Document Chatbot',
    category: 'GENERATIVE AI / RAG',
    githubUrl: 'https://github.com/Atish019/AI-Powered-RAG-Document-Chatbot',
    tech: ['RAG', 'Groq', 'LLaMA 3', 'Streamlit'],
  },
  {
    number: '12',
    title: 'Spark Data Lake',
    category: 'BIG DATA / DATA ENGINEERING',
    githubUrl: 'https://github.com/Atish019/spark-data-lake',
    tech: ['Apache Spark', 'MinIO', 'Trino', 'Docker'],
  },
  {
    number: '13',
    title: 'Pneumonia X-Ray Classification',
    category: 'COMPUTER VISION / DEEP LEARNING',
    githubUrl:
      'https://github.com/Atish019/Pneumonia_X-Ray_Classification_using_Identity-Mapping_ResFormer',
    tech: ['CNNs', 'Identity Mapping', 'PyTorch'],
  },
  {
    number: '14',
    title: 'Vehicle Detection & Counting',
    category: 'COMPUTER VISION',
    githubUrl: 'https://github.com/Atish019/Vehicle-Detection-and-Counting-Using-OpenCV',
    tech: ['OpenCV', 'Python'],
  },
  {
    number: '15',
    title: 'Movie Recommender System',
    category: 'RECOMMENDATION SYSTEMS',
    githubUrl: 'https://github.com/Atish019/movie-recommender-system',
    tech: ['Scikit-learn', 'Pandas', 'Similarity Search'],
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative w-full bg-ink text-fg-2 font-sans selection:bg-fg-3 selection:text-ink pt-20 pb-32 px-6 sm:px-12 lg:px-20"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-gold/5 rounded-full blur-[11.25rem] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-bronze/5 rounded-full blur-[10.625rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">

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
            02 / FEATURED WORK
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-gold/80 via-bronze/40 to-transparent" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-fg via-fg-3 to-fg-5 drop-shadow-[0_4px_12px_rgba(var(--p-shadow-rgb),0.8)]">
              SELECTED WORKS.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-grad-1 via-grad-2 to-grad-3 drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              SHIPPED INTELLIGENCE.
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-fg-4 max-w-sm mt-4 md:mt-0 leading-relaxed"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Scroll to unfold each system. Every project below runs end-to-end &mdash; from model to API to deployment.
          </p>
        </motion.div>

        {/* Stacking Deck */}
        <ScrollStack
          itemDistance={20}
          itemScale={0.035}
          itemStackDistance={28}
          stackPosition="15%"
          scaleEndPosition="6%"
          baseScale={0.88}
          useWindowScroll={true}
        >
          {projects.map((project) => (
            <ScrollStackItem key={project.title}>
              <div className="relative w-full rounded-2xl border border-bronze/50 bg-surface p-8 sm:p-12 shadow-[0_25px_70px_rgba(var(--p-shadow-rgb),0.98)] group overflow-hidden transition-colors duration-500 hover:border-gold">

                {/* Top Gold Border Light Flare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/80 to-transparent" />

                {/* Corner Minimal L-Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold/60 group-hover:border-gold transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold/60 group-hover:border-gold transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold/60 group-hover:border-gold transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold/60 group-hover:border-gold transition-colors" />

                {/* Big Background Watermark Number */}
                <span
                  className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold text-fg-2/5 select-none pointer-events-none leading-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.number}
                </span>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">

                  {/* Left Column (7 Cols) */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-xs font-mono font-bold text-gold">
                          {project.number} //
                        </span>
                        <span className="text-[0.65625rem] font-mono tracking-[0.25em] uppercase text-fg-4">
                          {project.category}
                        </span>
                      </div>

                      <h3
                        className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-fg mb-4 group-hover:text-grad-1 transition-colors uppercase leading-[0.9]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm md:text-[0.875rem] font-light text-fg-3 leading-[1.85] tracking-wide mb-8 max-w-2xl"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-bronze/25">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-[0.625rem] font-medium tracking-[0.16em] uppercase rounded-sm border border-bronze/40 bg-surface-2 text-fg-2 group-hover:border-gold/50 transition-all duration-300"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-bronze/25">
                    <div className="space-y-3">
                      <span className="text-[0.59375rem] font-mono tracking-[0.25em] uppercase text-bronze block mb-2">
                        // SYSTEM METRICS
                      </span>
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-3.5 rounded-sm border border-bronze/25 bg-ink-deep flex items-center justify-between"
                        >
                          <span className="text-[0.625rem] font-mono text-fg-4">
                            {m.label}
                          </span>
                          <span className="text-[0.6875rem] font-mono font-medium text-grad-1">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 border border-bronze bg-surface-2 hover:border-gold hover:bg-gold text-fg-2 hover:text-ink text-[0.6875rem] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(var(--p-glow-rgb),0.1)]"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <span>VIEW ON GITHUB</span>
                      <span className="text-xs">↗</span>
                    </a>
                  </div>

                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

        {/* ================= ADDITIONAL WORK GRID ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mt-24 mb-10"
        >
          <span
            className="text-[0.6875rem] font-medium tracking-[0.35em] uppercase text-gold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ALSO BUILT
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-gold/80 via-bronze/40 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideProjects.map((project, idx) => (
            <motion.a
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              whileHover={{ y: -5 }}
              className="relative flex flex-col p-7 sm:p-8 rounded-sm border border-bronze/35 bg-surface-1/85 backdrop-blur-xl overflow-hidden group transition-all duration-500 hover:border-gold/80 hover:shadow-[0_16px_45px_rgba(var(--p-glow-rgb),0.14)]"
            >
              {/* Corner pins */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/40 group-hover:border-gold transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/40 group-hover:border-gold transition-colors duration-300" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[0.625rem] font-mono tracking-[0.25em] uppercase text-fg-4 group-hover:text-gold transition-colors">
                  {project.number} // {project.category}
                </span>
                <span className="text-xs text-bronze group-hover:text-gold transition-all duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </div>

              <h3
                className="text-3xl sm:text-4xl font-normal tracking-wide text-fg mb-3 group-hover:text-grad-1 transition-colors uppercase leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {project.title}
              </h3>

              <p
                className="text-xs sm:text-[0.8125rem] font-light text-fg-4 leading-[1.75] mb-6 group-hover:text-fg-3 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-bronze/20">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[0.625rem] font-medium tracking-[0.16em] uppercase rounded-sm border border-bronze/35 bg-surface-2 text-fg-2 group-hover:border-gold/50 transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

        {/* ================= ARCHIVE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mt-24 mb-8"
        >
          <span
            className="text-[0.6875rem] font-medium tracking-[0.35em] uppercase text-gold"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ARCHIVE
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-gold/80 via-bronze/40 to-transparent" />
        </motion.div>

        <div className="border-t border-bronze/20">
          {archiveProjects.map((project, idx) => (
            <motion.a
              key={project.title}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
              className="group grid grid-cols-1 sm:grid-cols-12 items-center gap-y-2 gap-x-6 py-6 px-2 sm:px-4 border-b border-bronze/20 hover:bg-surface-1 hover:px-4 sm:hover:px-6 transition-all duration-400"
            >
              <span className="sm:col-span-1 text-[0.625rem] font-mono tracking-[0.2em] text-bronze group-hover:text-gold transition-colors">
                {project.number}
              </span>

              <h4
                className="sm:col-span-4 text-2xl sm:text-[1.6875rem] font-normal tracking-wide uppercase leading-none text-fg group-hover:text-grad-1 transition-colors"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {project.title}
              </h4>

              <span
                className="sm:col-span-3 text-[0.625rem] font-medium tracking-[0.2em] uppercase text-fg-4 group-hover:text-fg-3 transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {project.category}
              </span>

              <div className="sm:col-span-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[0.59375rem] font-medium tracking-[0.14em] uppercase rounded-sm border border-bronze/30 text-fg-3 group-hover:border-gold/50 group-hover:text-fg-2 transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <span className="sm:col-span-1 hidden sm:block text-right text-xs text-bronze group-hover:text-gold group-hover:translate-x-1 transition-all duration-300">
                &#8599;
              </span>
            </motion.a>
          ))}
        </div>

        {/* All repos link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mt-16"
        >
          <a
            href="https://github.com/Atish019?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center space-x-3 px-8 py-4 border border-bronze/50 bg-surface-1 hover:border-gold hover:bg-surface-2 text-fg-2 hover:text-grad-1 text-[0.6875rem] font-medium tracking-[0.25em] uppercase transition-all duration-300"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>EXPLORE ALL REPOSITORIES</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &#8599;
            </span>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProjectsSection;
