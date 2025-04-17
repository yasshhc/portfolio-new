
import React from 'react';
import portfolioData from '@/data/portfolioData';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="section-min-height flex items-center justify-center snap-center bg-white">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-pastel-blue/30 p-6 md:p-8 rounded-lg shadow-sm">
            <p className="text-lg leading-relaxed mb-6">
              {portfolioData.aboutMe}
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center">
              <div className="bg-pastel-green rounded-full px-4 py-1 text-sm">Project Management</div>
              <div className="bg-pastel-blue rounded-full px-4 py-1 text-sm">Data Analysis</div>
              <div className="bg-pastel-yellow rounded-full px-4 py-1 text-sm">Team Leadership</div>
              <div className="bg-pastel-orange rounded-full px-4 py-1 text-sm">Process Optimization</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
