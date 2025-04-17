
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItemProps {
  label: string;
  section: string;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, section, onClick }) => {
  return (
    <li className="px-5 py-2">
      <a
        href={`#${section}`}
        className="text-foreground hover:text-primary transition-colors relative group"
        onClick={(e) => {
          e.preventDefault();
          onClick();
          const targetSection = document.getElementById(section);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {label}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary"></span>
      </a>
    </li>
  );
};

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'Home', section: 'home' },
    { label: 'About', section: 'about' },
    { label: 'Resume', section: 'resume' },
    { label: 'Projects', section: 'projects' },
    { label: 'Skills', section: 'skills' },
    { label: 'Certifications', section: 'certifications' },
    { label: 'Recommendations', section: 'recommendations' },
    { label: 'Contact', section: 'contact' }
  ];

  return (
    <>
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-sm shadow-sm" : "bg-transparent"
      )}>
        <div className="container mx-auto flex justify-between items-center py-4">
          <a href="#home" className="text-xl font-semibold text-foreground">
            Yash Channe
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <NavItem 
                  key={item.section} 
                  label={item.label} 
                  section={item.section} 
                  onClick={closeMenu} 
                />
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground focus:outline-none"
            aria-label="Toggle menu"
            onClick={toggleMenu}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          "md:hidden fixed inset-0 bg-background z-40 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="container mx-auto py-4 px-4">
            <div className="flex justify-between items-center mb-8">
              <a href="#home" className="text-xl font-semibold text-foreground">
                Yash Channe
              </a>
              <button 
                className="text-foreground focus:outline-none"
                aria-label="Close menu"
                onClick={toggleMenu}
              >
                <X size={24} />
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <NavItem 
                    key={item.section} 
                    label={item.label} 
                    section={item.section} 
                    onClick={closeMenu} 
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg transition-opacity duration-300 z-40",
          showScrollTop ? "opacity-70 hover:opacity-100" : "opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default Navbar;
