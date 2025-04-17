
import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-white/80">© Yash Channe 2025 | All rights reserved</p>
          </div>
          
          <div className="flex gap-6">
            <a 
              href={`mailto:${portfolioData.email}`}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
            
            {portfolioData.socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label={link.name}
              >
                {link.name === 'LinkedIn' && <Linkedin size={20} />}
                {link.name === 'GitHub' && <Github size={20} />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
