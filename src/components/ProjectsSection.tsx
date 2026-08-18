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
];

export const ProjectsSection: React.FC = () => {
  return (
    <section
      id="work"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#cbb59d] selection:text-black pt-20 pb-32 px-6 sm:px-12 lg:px-20"
    >
      {/* Studio Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />

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
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            02 / FEATURED WORK
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
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
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              SELECTED WORKS.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
              SHIPPED INTELLIGENCE.
            </span>
          </h2>

          <p
            className="text-xs sm:text-sm font-light text-[#A8988B] max-w-sm mt-4 md:mt-0 leading-relaxed"
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
              <div className="relative w-full rounded-2xl border border-[#8C6D4F]/50 bg-[#0E0C0A] p-8 sm:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.98)] group overflow-hidden transition-colors duration-500 hover:border-[#D4AF37]">

                {/* Top Gold Border Light Flare */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/80 to-transparent" />

                {/* Corner Minimal L-Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />

                {/* Big Background Watermark Number */}
                <span
                  className="absolute -bottom-6 -right-3 text-8xl sm:text-9xl font-bold text-[#EAD8C7]/5 select-none pointer-events-none leading-none"
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
                        <span className="text-xs font-mono font-bold text-[#D4AF37]">
                          {project.number} //
                        </span>
                        <span className="text-[10.5px] font-mono tracking-[0.25em] uppercase text-[#A8988B]">
                          {project.category}
                        </span>
                      </div>

                      <h3
                        className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-4 group-hover:text-[#F7E7C4] transition-colors uppercase leading-[0.9]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        {project.title}
                      </h3>

                      <p
                        className="text-xs sm:text-sm md:text-[14px] font-light text-[#BDB0A4] leading-[1.85] tracking-wide mb-8 max-w-2xl"
                        style={{ fontFamily: "'Montserrat', sans-serif" }}
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-[#8C6D4F]/25">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 lg:pl-6 lg:border-l lg:border-[#8C6D4F]/25">
                    <div className="space-y-3">
                      <span className="text-[9.5px] font-mono tracking-[0.25em] uppercase text-[#8C6D4F] block mb-2">
                        // SYSTEM METRICS
                      </span>
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="p-3.5 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex items-center justify-between"
                        >
                          <span className="text-[10px] font-mono text-[#A8988B]">
                            {m.label}
                          </span>
                          <span className="text-[11px] font-mono font-medium text-[#F7E7C4]">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center space-x-3 px-6 py-3.5 border border-[#8C6D4F] bg-[#16120E] hover:border-[#D4AF37] hover:bg-[#D4AF37] text-[#EAD8C7] hover:text-black text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)]"
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
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            ALSO BUILT
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
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
              className="relative flex flex-col p-7 sm:p-8 rounded-sm border border-[#8C6D4F]/35 bg-[#100D0B]/85 backdrop-blur-xl overflow-hidden group transition-all duration-500 hover:border-[#D4AF37]/80 hover:shadow-[0_16px_45px_rgba(212,175,55,0.14)]"
            >
              {/* Corner pins */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/40 group-hover:border-[#D4AF37] transition-colors duration-300" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#A8988B] group-hover:text-[#D4AF37] transition-colors">
                  {project.number} // {project.category}
                </span>
                <span className="text-xs text-[#8C6D4F] group-hover:text-[#D4AF37] transition-all duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </div>

              <h3
                className="text-3xl sm:text-4xl font-normal tracking-wide text-white mb-3 group-hover:text-[#F7E7C4] transition-colors uppercase leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {project.title}
              </h3>

              <p
                className="text-xs sm:text-[13px] font-light text-[#A8988B] leading-[1.75] mb-6 group-hover:text-[#D5CBC0] transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#8C6D4F]/20">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#8C6D4F]/35 bg-[#171310] text-[#E8D7C5] group-hover:border-[#D4AF37]/50 transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
