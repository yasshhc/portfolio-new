
import React from 'react';
import { FileText } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const ResumeSection: React.FC = () => {
  return (
    <section id="resume" className="section-min-height flex items-center justify-center snap-center bg-gradient-to-br from-white via-pastel-green/20 to-white">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Resume</h2>
        
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="p-4 rounded-full bg-pastel-green">
              <FileText size={64} className="text-primary" />
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">View My Resume</h3>
              <p className="text-muted-foreground mb-6">
                Download my resume to learn more about my professional experience, education, and skills.
              </p>
              
              <a 
                href={portfolioData.resumeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                <FileText size={20} />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
