
import React from 'react';
import { ChevronDown } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const HeroSection: React.FC = () => {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="section-min-height flex items-center justify-center relative snap-center bg-gradient-to-tr from-pastel-blue via-white to-pastel-green"
    >
      <div className="container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground">
            {portfolioData.name}
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-8">
            {portfolioData.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="#contact" 
              className="bg-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
            <a 
              href="#projects" 
              className="bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              View Projects
            </a>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={36} className="text-primary" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
