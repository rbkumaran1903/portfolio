import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  Briefcase, 
  ChevronRight, 
  ShieldCheck, 
  Layers, 
  Globe, 
  Mail,
  Linkedin,
  Activity,
  Cpu,
  CheckCircle2,
  Sun,
  Moon,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';
import Resume from './Resume';

// --- Data ---
const experiences = [
  {
    company: "Canvendor Software Solutions",
    role: "Senior Business Analyst / PMO",
    period: "2023 – Present",
    desc: "Spearheading BA initiatives and PMO governance, ensuring structured delivery across enterprise software solutions. Expert in managing Agile/Scrum ceremonies and backlog refinement."
  },
  {
    company: "Oremus Corporate Services",
    role: "Business Analyst",
    period: "2016 – 2023",
    desc: "Focused on Insurance and US Payments - ACH / ICL domains. Bridge between stakeholders and dev teams for large-scale financial platforms."
  },
  {
    company: "Escribe Outsourcing Pvt Ltd",
    role: "Operations / Functional Support",
    period: "2008 – 2016",
    desc: "Developed foundational expertise in process optimization and functional business support."
  }
];

const projects = [
  {
    title: "AI-Powered Audit Document Analyzer",
    client: "Financial Audit",
    impact: "Reduced manual audit effort by 40%",
    tags: ["AI/ML", "OCR", "NLP"],
    icon: <Cpu className="w-6 h-6" />
  },
  {
    title: "AI Powered Health Claims Pre Auth Denial management",
    client: "Insurance Domain",
    impact: "30% Improvement in turnaround time",
    tags: ["AI", "Healthcare", "Denial Management"],
    icon: <Activity className="w-6 h-6" />
  },
  {
    title: "IRCTC System Integration",
    client: "Infrastructure",
    impact: "Enhanced transaction success rates",
    tags: ["Integration", "API", "Scalability"],
    icon: <Globe className="w-6 h-6" />
  }
];

// --- Sub-Components ---

interface Project {
  title: string;
  client: string;
  impact: string;
  tags: string[];
  icon: React.ReactNode;
}

const SectionHeading: React.FC<{ children: React.ReactNode, subtitle: string }> = ({ children, subtitle }) => (
  <div className="mb-8">
    <motion.span 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }}
      className="text-premium-blue font-semibold tracking-widest uppercase text-sm"
    >
      {subtitle}
    </motion.span>
    <h2 className="text-4xl md:text-5xl font-bold text-premium-navy dark:text-white mt-1 tracking-tight transition-colors">
      {children}
    </h2>
  </div>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white dark:bg-dark-card p-6 rounded-xl border border-slate-100 dark:border-dark-border shadow-sm hover:shadow-2xl transition-all duration-300"
  >
    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-premium-blue rounded-lg flex items-center justify-center mb-4">
      {project.icon}
    </div>
    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{project.client}</span>
    <h3 className="text-xl font-bold text-premium-navy dark:text-white mt-1 mb-2 transition-colors">{project.title}</h3>
    <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed transition-colors">{project.impact}</p>
    <div className="flex flex-wrap gap-2">
      {project.tags.map(tag => (
        <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded uppercase border border-slate-100 dark:border-dark-border transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const openResume = () => {
    window.open('/resume', '_blank', 'width=800,height=1000,scrollbars=yes');
  };

  return (
    <Router>
      <Routes>
        <Route path="/resume" element={<Resume />} />
        <Route path="/" element={
          <div className="bg-premium-bg dark:bg-dark-bg min-h-screen font-sans text-premium-navy dark:text-white selection:bg-blue-100 selection:text-premium-blue transition-colors duration-500">
            
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-slate-100 dark:border-dark-border transition-colors">
              <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <span className="text-xl font-black tracking-tighter">BR<span className="text-premium-blue">.</span></span>
                <div className="flex items-center gap-6 md:gap-10">
                  <div className="hidden md:flex gap-10 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <a href="#about" className="hover:text-premium-blue transition-colors">Expertise</a>
                    <a href="#experience" className="hover:text-premium-blue transition-colors">Experience</a>
                    <a href="#projects" className="hover:text-premium-blue transition-colors">Case Studies</a>
                  </div>
                  
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-premium-navy dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                    aria-label="Toggle theme"
                  >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>

                  <a href="#contact" className="hidden md:block bg-premium-navy dark:bg-premium-blue text-white px-5 py-2 rounded-full hover:bg-premium-blue dark:hover:bg-blue-400 transition-all text-sm font-medium">Contact</a>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-28 pb-12 px-6">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-3xl"
                >
                  <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-6">
                    Driving <span className="text-premium-blue">Digital</span> Transformation.
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8 border-l-4 border-premium-blue pl-6 transition-colors">
                    Balakumaran Ravindran — A Senior Business Analyst and PMO professional with 15+ years of 
                    operational excellence in General Insurance and Strategic PMO. Expert in <u className="decoration-premium-blue/40 underline-offset-4">Agile/Scrum</u> methodologies and <u className="decoration-premium-blue/40 underline-offset-4">PMO governance</u> for enterprise-scale transformations.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={openResume}
                      className="flex items-center gap-2 bg-premium-navy dark:bg-premium-blue text-white px-8 py-4 rounded-lg font-bold hover:bg-premium-blue dark:hover:bg-blue-400 transition-all"
                    >
                      View full profile <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>

                {/* Profile Picture */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative group"
                >
                  <div className="absolute -inset-4 bg-premium-blue/20 rounded-full blur-2xl group-hover:bg-premium-blue/30 transition-all duration-500"></div>
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 border-white dark:border-dark-card shadow-2xl transform group-hover:rotate-3 transition-all duration-500 bg-slate-50 dark:bg-slate-900">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D5603AQG3GAJdGhLz0w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1681909717259?e=1775692800&v=beta&t=rUw4mXkAq9sSRBIVwOQDCN4ht8KnljcgjM6qGtkH2F8" 
                      alt="Balakumaran Ravindran" 
                      className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-luminosity opacity-95 brightness-[0.98] contrast-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-premium-navy/20 via-transparent to-transparent pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-premium-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-premium-blue rounded-full flex items-center justify-center text-white shadow-xl transform group-hover:scale-110 transition-all duration-500">
                    <Briefcase className="w-10 h-10" />
                  </div>
                </motion.div>
              </div>
            </section>

      {/* Stats Bar */}
      <div className="bg-white dark:bg-dark-card border-y border-slate-100 dark:border-dark-border transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 dark:divide-dark-border">
            {[
              { label: "Experience", val: "15+ Yrs" },
              { label: "BA Domain Expert", val: "7+ Yrs" },
              { label: "Projects Delivered", val: "25+" },
              { label: "Domain Expertise", val: "Insurance & Payments" }
            ].map((stat, i) => (
              <div key={i} className="py-8 px-4 flex flex-col items-center justify-center text-center min-h-[120px]">
                <div className={`font-bold text-premium-navy dark:text-white transition-colors leading-tight ${
                  stat.val.length > 12 ? 'text-lg md:text-xl' : 'text-2xl md:text-3xl'
                }`}>
                  {stat.val}
                </div>
                <div className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] mt-2 transition-colors">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expertise Section */}
      <section id="about" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Expertise">Strategic Solutions</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                title: "Business Analysis",
                icon: <Layers />,
                items: ["Requirement Elicitation", "BRD/FRD Documentation", "User Stories", "Process Mapping"]
              },
              {
                title: "Governance & PMO",
                icon: <ShieldCheck />,
                items: ["Trained Scrum Master", "Agile/Scrum Delivery", "RAID Log Management", "Stakeholder Reporting"]
              },
              {
                title: "Domain Knowledge",
                icon: <Briefcase />,
                items: ["General Insurance", "Claims Lifecycle", "US Payments - ACH / ICL", "UAT Strategy"]
              },
              {
                title: "PreSales & POCs",
                icon: <Zap />,
                items: ["Quick POC Development", "Solution Architecture", "PreSales Support", "Market Trend Analysis"]
              }
            ].map((skill, i) => (
              <div key={i} className="group">
                <div className="text-premium-blue mb-4 group-hover:scale-110 transition-transform duration-300">
                  {React.cloneElement(skill.icon as React.ReactElement, { size: 32, strokeWidth: 1.5 })}
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">{skill.title}</h3>
                <ul className="space-y-3">
                  {skill.items.map(item => (
                    <li key={item} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-premium-blue" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 bg-premium-navy dark:bg-dark-card text-white px-6 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
             <span className="text-blue-400 font-semibold tracking-widest uppercase text-sm">Professional Journey</span>
             <h2 className="text-4xl md:text-5xl font-bold mt-1">Career Milestones</h2>
          </div>
          <div className="space-y-6">
            {experiences.map((exp, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-12 border-b border-white/10 pb-6 last:border-0">
                <div className="md:w-1/5">
                  <span className="text-blue-400 font-mono text-sm">{exp.period}</span>
                </div>
                <div className="md:w-4/5">
                  <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                  <p className="text-lg text-white/70 mb-1">{exp.company}</p>
                  <p className="text-slate-400 max-w-2xl leading-relaxed text-sm">{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Case Studies">Key Transformations</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-7xl mx-auto bg-white dark:bg-dark-card rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-12 transition-colors">
          <div className="max-w-lg">
            <h2 className="text-5xl font-bold tracking-tight mb-4">Let's connect.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 transition-colors">I'm always open to discussing strategic PMO leadership and high-impact business analysis opportunities.</p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <a href="mailto:reachbalakumaran@gmail.com" className="flex items-center justify-center gap-3 bg-premium-blue text-white px-10 py-5 rounded-xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all">
              <Mail className="w-5 h-5" /> Send an Email
            </a>
            <a href="https://www.linkedin.com/in/balakumaran-ravindran" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-slate-100 dark:bg-slate-800 text-premium-navy dark:text-white px-10 py-5 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              <Linkedin className="w-5 h-5" /> LinkedIn Profile
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-slate-100 dark:border-dark-border text-center text-slate-400 text-sm font-medium transition-colors">
        © {new Date().getFullYear()} Balakumaran Ravindran. Corporate Professional Portfolio.
      </footer>
    </div>
        } />
      </Routes>
    </Router>
  );
}
