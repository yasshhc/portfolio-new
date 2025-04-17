
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import ProjectsSection from '@/components/ProjectsSection';
import SkillsSection from '@/components/SkillsSection';
import CertificationsSection from '@/components/CertificationsSection';
import RecommendationsSection from '@/components/RecommendationsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-background ${!isMobile ? 'snap-y-mandatory hide-scrollbar' : ''}`}>
      <Navbar isScrolled={isScrolled} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ResumeSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <RecommendationsSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
