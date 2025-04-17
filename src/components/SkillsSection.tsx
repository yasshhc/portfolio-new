
import React, { useState, useEffect } from 'react';
import portfolioData from '@/data/portfolioData';
import { useIsMobile } from '@/hooks/use-mobile';

interface SkillGroupProps {
  category: string;
  skills: typeof portfolioData.skills;
  shouldAnimate: boolean;
}

const SkillGroup: React.FC<SkillGroupProps> = ({ category, skills, shouldAnimate }) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">{category}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{skill.name}</span>
              <span>{skill.level}%</span>
            </div>
            <div className="h-2 bg-pastel-blue/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                style={{ 
                  width: shouldAnimate ? `${skill.level}%` : '0%'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const section = document.getElementById('skills');
    if (section) {
      observer.observe(section);
    }
    
    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  
  // Group skills by category
  const categories = Array.from(new Set(portfolioData.skills.map(skill => skill.category)));
  
  return (
    <section id="skills" className="section-min-height flex items-center justify-center snap-center bg-white">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills & Tools</h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <SkillGroup
              key={category}
              category={category}
              skills={portfolioData.skills.filter(skill => skill.category === category)}
              shouldAnimate={isVisible && !isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
