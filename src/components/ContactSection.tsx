
import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section-min-height flex items-center justify-center snap-center bg-gradient-to-br from-white via-pastel-blue/30 to-white">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get in Touch</h2>
        
        <div className="max-w-xl mx-auto">
          <p className="text-center text-lg mb-10">
            Interested in collaborating or have a question? Feel free to reach out!
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <a 
              href={`mailto:${portfolioData.email}`}
              className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Mail size={24} className="text-primary" />
              <span>{portfolioData.email}</span>
            </a>
            
            {portfolioData.socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                {link.name === 'LinkedIn' && <Linkedin size={24} className="text-primary" />}
                {link.name === 'GitHub' && <Github size={24} className="text-primary" />}
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
