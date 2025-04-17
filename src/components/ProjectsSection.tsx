
import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import portfolioData from '@/data/portfolioData';

const ProjectCard: React.FC<{ project: typeof portfolioData.projects[0] }> = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-pastel-blue/50 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <a 
          href={project.githubLink}
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <Github size={18} />
          View on GitHub
        </a>
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="section-min-height flex items-center justify-center snap-center bg-pastel-blue/20">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {portfolioData.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <a 
            href="https://github.com/yashchanne" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-white px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <ExternalLink size={18} />
            View More Projects
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
