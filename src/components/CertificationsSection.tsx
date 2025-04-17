
import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="section-min-height flex items-center justify-center snap-center bg-pastel-green/20">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Certifications</h2>
        
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.certifications.map((certification) => (
            <div 
              key={certification.id} 
              className="bg-white rounded-lg shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="bg-pastel-yellow/50 p-3 rounded-full flex-shrink-0">
                <Award size={24} className="text-amber-600" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold">{certification.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {certification.issuer} • {certification.date}
                </p>
                
                <a 
                  href={certification.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary text-sm mt-2 hover:underline"
                >
                  <ExternalLink size={14} />
                  Verify
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
