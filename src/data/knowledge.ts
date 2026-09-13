/**
 * Retrieval corpus for the portfolio assistant. Every fact here is drawn from
 * Atish's own CV and repositories — the assistant is instructed to answer from
 * these chunks only, so nothing gets invented on his behalf.
 */
export interface KnowledgeChunk {
  /** Space-separated keywords; a tag hit scores higher than a body hit. */
  tags: string;
  text: string;
}

export const knowledgeBase: KnowledgeChunk[] = [
  {
    tags: 'who about intro bio yourself background summary profile atish sharma introduce hello hi hey namaste',
    text: "I am Atish Kumar Sharma, an AI/ML Engineer based in Lucknow, India. I specialise in Generative AI, LLMs, RAG pipelines, LLM fine-tuning and multi-agent AI systems, and I build end-to-end intelligent applications — from model to deployed API. My core stack is Python, LangChain, LangGraph, PyTorch, TensorFlow, FastAPI, Groq, ChromaDB, Docker and AWS. I am currently doing my M.Sc. in Artificial Intelligence & Machine Learning at IIIT Lucknow.",
  },
  {
    tags: 'education msc degree iiit lucknow masters bachelor bsc mathematics patliputra university study college academic',
    text: "Education: M.Sc. in Artificial Intelligence & Machine Learning at Indian Institute of Information Technology (IIIT) Lucknow, August 2024 to present — focused on AI, Machine Learning, Deep Learning, NLP, Computer Vision and Generative AI. Before that, B.Sc. Mathematics (Honours) from Patliputra University, Patna (August 2019 – September 2022), which gave me the mathematical foundation I lean on in ML work.",
  },
  {
    tags: 'experience work job internship edunet foundation intern role company career hire hiring employment',
    text: "Experience: AI Foundations Intern at Edunet Foundation (2025). I built and deployed AI applications there — LLM-based chatbots, RAG systems, multi-agent applications, and FastAPI/Streamlit solutions with vector database integration. I am currently open to AI/ML Engineer and Generative AI roles.",
  },
  {
    tags: 'achievements rank iit jam amazon ml challenge competition award air certification certificate simplilearn udemy credentials',
    text: "Achievements: IIT JAM 2024 — All India Rank 1531 in Mathematics among 15,000+ candidates. Amazon ML Challenge — Team All India Rank 503 in a nationwide machine learning competition. Certifications: Data Science with Python (Simplilearn), Machine Learning (Simplilearn), Full Stack Web Development (Udemy), and Python + SQL with 110+ exercises (Udemy).",
  },
  {
    tags: 'research paper publication lstm crop ranking thesis msc supervisor tiwari accuracy benchmark dcnn gcn',
    text: "Research: 'Crop Ranking Using LSTM — A Soil and Environment-Aware Deep Learning Approach', manuscript prepared at IIIT Lucknow. It reaches 99.77% test accuracy across 22 crop categories on 2,200 agronomic samples using 7 parameters, and converts the softmax distribution into a Top-K ranking that outperforms DCNN+LSTM and GCN baselines. My M.Sc. thesis, 'Crop Ranking System Based on Soil and Environment Conditions', is the same line of work, supervised by Dr. Sushil Kumar Tiwari, using N, P, K and pH alongside temperature, humidity and rainfall signals.",
  },
  {
    tags: 'projects project portfolio work built showcase list all overview top best repositories github',
    text: "I have shipped 15+ AI/ML projects. The featured four are: A2A Protocol (multi-agent communication), Post-Discharge Medical AI Assistant (multi-agent RAG for nephrology care), SciSynth-AI (autonomous research assistant), and Gemma-2B LoRA fine-tuning. Beyond those: Butterfly U-Net segmentation, Agriculture AI Crop Ranking, RAG Q&A Conversation, Custom YOLOv11 detection, Credit Card Fraud Detection, AI Lecture Transcriber, AI-Powered RAG Document Chatbot, Spark Data Lake, Pneumonia X-Ray Classification, Vehicle Detection & Counting, and a Movie Recommender System. All of them are at https://github.com/Atish019?tab=repositories — ask me about any one for details.",
  },
  {
    tags: 'a2a protocol agent communication json-rpc agent cards bearer token multi-agent project',
    text: "Project — A2A Protocol: a multi-agent system implementing the A2A Protocol so AI agents can communicate and collaborate over JSON-RPC on HTTP. It uses Agent Cards for capability discovery and Bearer Token authentication for secure agent-to-agent messaging. Built in Python. Repo: https://github.com/Atish019/a2a-protocol",
  },
  {
    tags: 'medical post-discharge nephrology healthcare patient assistant langgraph rag chromadb project health',
    text: "Project — Post-Discharge Medical AI Assistant: a multi-agent system for post-discharge nephrology patient care. It combines LangGraph agent workflows, RAG, vector search and LLMs to give context-aware medical assistance. Stack: Python, LangGraph, LangChain, Groq API, ChromaDB, SQLite, FastAPI, Docker, Hugging Face Spaces. Repo: https://github.com/Atish019/Post-Discharge-Medical-AI-Assistant",
  },
  {
    tags: 'scisynth research assistant arxiv papers agents latex synthesis project science',
    text: "Project — SciSynth-AI: an AI research assistant that runs several specialised agents to search, analyse and synthesise academic papers from arXiv. It identifies research directions, generates ideas, and produces complete research papers with LaTeX mathematical equations. Stack: Python, LangChain, LangGraph, arXiv API, Streamlit, Tectonic. Repo: https://github.com/Atish019/SciSynth-AI",
  },
  {
    tags: 'gemma lora finetuning fine-tuning peft quantization quotes llm project qlora',
    text: "Project — Gemma-2B LoRA Fine-tuning: supervised fine-tuning of Google Gemma-2-2B on an English quotes dataset using LoRA and 4-bit quantization, demonstrating memory-efficient LLM adaptation through low-rank parameter updates. Stack: Python, PyTorch, Hugging Face, PEFT, Google Colab. Repo: https://github.com/Atish019/Gemma2b-LoRA-Finetuning-Quotes",
  },
  {
    tags: 'butterfly unet segmentation computer vision mask fastapi project image',
    text: "Project — Butterfly Semantic Segmentation with U-Net: pixel-level separation of butterflies from their backgrounds, with an inference API and an interactive frontend for visualising the masks. Stack: Python, U-Net, FastAPI, Docker, Hugging Face Spaces. Repo: https://github.com/Atish019/butterfly-semantic-segmentation-UNET--Computer-Vision-",
  },
  {
    tags: 'agriculture crop ranking lstm soil npk rainfall farming project accuracy',
    text: "Project — Agriculture AI Crop Ranking System: an LSTM-based crop ranking and recommendation engine that reads soil nutrients and environment — N, P, K, temperature, humidity, pH and rainfall — to recommend suitable crops. It reaches 99.77% validation accuracy across 22 crop categories. Stack: Python, LSTM, Scikit-learn, Pandas, NumPy. Repo: https://github.com/Atish019/agriculture-ai-crop-ranking-system",
  },
  {
    tags: 'rag qa conversation pdf chatbot streamlit chromadb gemma groq project documents',
    text: "Project — RAG Q&A Conversation: a conversational RAG app where users upload PDFs, retrieve relevant document context and talk to their documents with session-based chat history. Stack: Python, Streamlit, LangChain, Hugging Face embeddings, ChromaDB, Groq, Gemma2-9B-It. Repo: https://github.com/Atish019/RAG-Q-A-Conversation",
  },
  {
    tags: 'yolo yolov11 object detection mlops aws docker training project vision',
    text: "Project — Custom YOLOv11 Object Detection: an end-to-end detection system covering custom training, an inference API, Docker containerisation and production deployment on AWS. Repo: https://github.com/Atish019/Custom_Training_YOLOv11_From_Scratch",
  },
  {
    tags: 'fraud detection credit card xgboost smote mlflow dvc imbalance project finance',
    text: "Project — Credit Card Fraud Detection: an end-to-end pipeline using EDA and SMOTE for class imbalance. Several models were compared and XGBoost reached 97.61% accuracy, with MLflow experiment tracking and a Dockerised Streamlit dashboard. Repo: https://github.com/Atish019/credit_card_fraud_detection",
  },
  {
    tags: 'lecture transcriber youtube notes gemini transcript summarise project education',
    text: "Project — AI Lecture Transcriber (YouTube to Notes): turns lecture videos into structured notes using Google Gemini and the YouTube API, wrapped in a Streamlit interface. Repo: https://github.com/Atish019/AI_Lecture_Transcriber_YouTube_to_Notes_Converter",
  },
  {
    tags: 'spark data lake pneumonia xray resformer vehicle detection opencv movie recommender archive other projects',
    text: "More projects: AI-Powered RAG Document Chatbot (https://github.com/Atish019/AI-Powered-RAG-Document-Chatbot), Spark Data Lake for big-data pipelines (https://github.com/Atish019/spark-data-lake), Pneumonia X-Ray Classification with an Identity-Mapping ResFormer (https://github.com/Atish019/Pneumonia_X-Ray_Classification_using_Identity-Mapping_ResFormer), Vehicle Detection & Counting with OpenCV (https://github.com/Atish019/Vehicle-Detection-and-Counting-Using-OpenCV), and a Movie Recommender System (https://github.com/Atish019/movie-recommender-system).",
  },
  {
    tags: 'skills stack tools technologies languages frameworks python langchain langgraph pytorch tensorflow know',
    text: "Skills — Generative AI & Agents: LLMs, RAG, Agentic AI, Multi-Agent Systems, LangChain, LangGraph, LlamaIndex, LangSmith, Transformers, Prompt Engineering, LLM fine-tuning, LoRA, QLoRA, PEFT, Hugging Face, Groq, Gemma-2, LLaMA 3. ML & DL: Scikit-learn, PyTorch, TensorFlow, Keras, XGBoost, CNNs, RNNs, LSTM, GANs, ResNet, U-Net, YOLO. NLP & CV: BERT, GPT-2, spaCy, NER, text classification, OpenCV, object detection, image segmentation, Faster R-CNN. Backend & data: Python, C, SQL, FastAPI, REST APIs, PostgreSQL, MongoDB, MySQL, SQLite, ChromaDB, vector databases, Apache Spark. MLOps: Docker, Kubernetes, MLflow, DVC, GitHub Actions, CI/CD, AWS EC2 and S3, Hugging Face Spaces, Streamlit Cloud, Git.",
  },
  {
    tags: 'scratch implementation built from scratch architectures llm gan resnet inception vgg transformer',
    text: "I have reimplemented several architectures from scratch to understand them properly rather than only calling libraries: LLMs, GANs, ResNet, Inception, VGG16 and Transformers.",
  },
  {
    tags: 'contact email hire linkedin github kaggle huggingface resume reach location lucknow connect available remote opportunity',
    text: "Contact: email atish.sharma6203@gmail.com. GitHub https://github.com/Atish019 · LinkedIn https://www.linkedin.com/in/atish-kr-sharma-85a2972a7/ · Hugging Face https://huggingface.co/Atish020 · Kaggle https://www.kaggle.com/atishshrma. I am based in Lucknow, India and open to remote work. I am happy to talk about AI/ML Engineer roles, Generative AI work, research collaborations and interesting agentic-AI problems.",
  },
];
