
import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const RecommendationsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { recommendations } = portfolioData;

  const nextRecommendation = () => {
    setActiveIndex((activeIndex + 1) % recommendations.length);
  };

  const prevRecommendation = () => {
    setActiveIndex((activeIndex - 1 + recommendations.length) % recommendations.length);
  };

  return (
    <section id="recommendations" className="section-min-height flex items-center justify-center snap-center bg-pastel-purple/20">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Recommendations</h2>
        
        {recommendations.length > 0 ? (
          <div className="max-w-3xl mx-auto relative">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
              <div className="text-primary opacity-30 mb-4">
                <Quote size={48} />
              </div>
              
              <div className="min-h-[12rem]">
                <p className="text-lg mb-8 italic">
                  {recommendations[activeIndex].text}
                </p>
                
                <div>
                  <h4 className="font-semibold">{recommendations[activeIndex].name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {recommendations[activeIndex].position}, {recommendations[activeIndex].company}
                  </p>
                </div>
              </div>
              
              {recommendations.length > 1 && (
                <div className="flex justify-center gap-4 mt-8">
                  <button 
                    onClick={prevRecommendation}
                    className="p-2 rounded-full bg-pastel-blue hover:bg-pastel-blue/70 transition-colors"
                    aria-label="Previous recommendation"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextRecommendation}
                    className="p-2 rounded-full bg-pastel-blue hover:bg-pastel-blue/70 transition-colors"
                    aria-label="Next recommendation"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex justify-center mt-4 gap-2">
              {recommendations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to recommendation ${index + 1}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Recommendations coming soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendationsSection;
