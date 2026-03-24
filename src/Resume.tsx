import React, { useEffect, useState } from 'react';
import { Mail, Linkedin, Phone, MapPin, Download, Printer } from 'lucide-react';

interface ResumeData {
  name: string;
  title: string;
  summary: string;
  experience: {
    company: string;
    role: string;
    period: string;
    highlights: string[];
  }[];
  skills: string[];
}

export default function Resume() {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/resume.json')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch resume:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-slate-600">Failed to load resume data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
        
        {/* Header */}
        <header className="bg-slate-900 text-white p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{data.name}</h1>
              <p className="text-blue-400 text-xl font-medium mt-1">{data.title}</p>
            </div>
            <div className="flex gap-4 no-print">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md transition-all text-sm font-bold"
              >
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400" /> reachbalakumaran@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4 text-blue-400" /> 
              <a href="https://www.linkedin.com/in/balakumaran-ravindran" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                linkedin.com/in/balakumaran-ravindran
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" /> Chennai, India
            </div>
          </div>
        </header>

        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-blue-600 pb-2 mb-4">Professional Summary</h2>
              <p className="text-slate-600 leading-relaxed italic">
                "{data.summary}"
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-blue-600 pb-2 mb-4">Professional Experience</h2>
              <div className="space-y-6">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-sm font-mono text-blue-600 bg-blue-50 px-2 py-1 rounded">{exp.period}</span>
                    </div>
                    <p className="text-slate-700 font-semibold mb-2">{exp.company}</p>
                    <ul className="list-disc list-outside ml-5 space-y-1 text-slate-600 text-sm">
                      {exp.highlights.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-blue-600 pb-2 mb-4">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map(skill => (
                  <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-blue-600 pb-2 mb-4">Education</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-slate-900">Bachelor of Engineering</h3>
                  <p className="text-sm text-slate-600">Anna University</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold uppercase tracking-widest text-slate-900 border-b-2 border-blue-600 pb-2 mb-4">Training</h2>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Trained Scrum Master
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span> Business Analysis
                </li>
              </ul>
            </section>

          </div>
        </div>

        <footer className="bg-slate-50 p-6 text-center text-slate-400 text-xs border-t border-slate-100">
          This resume is dynamically generated from the backend API.
        </footer>
      </div>
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
          .shadow-2xl { shadow: none !important; }
          .bg-slate-100 { background: white !important; }
        }
      `}</style>
    </div>
  );
}
