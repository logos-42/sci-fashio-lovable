
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Studio", href: "#studio" },
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling for anchor links
  const handleNavLinkClick = (href: string) => {
    setIsOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "backdrop-blur-md bg-white/80 shadow-subtle py-3" 
          : "bg-transparent py-5"
      )}
    >
      <div className="section-container flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 z-10">
          <span className="font-serif text-2xl tracking-tight">Fashion</span>
          <span className="font-mono text-sm tracking-widest">AI</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavLinkClick(link.href);
              }}
              className="text-sm font-medium text-fashion-800 hover:text-fashion-600 transition-colors relative group"
            >
              {link.label}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-fashion-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          ))}
        </nav>

        <div className="hidden md:flex space-x-4 items-center">
          <a
            href="#getstarted"
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick('#studio');
            }}
            className="button-primary"
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden z-10 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white flex flex-col items-center justify-center space-y-8 transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              handleNavLinkClick(link.href);
            }}
            className="text-2xl font-medium text-fashion-900 hover:text-fashion-700"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#getstarted"
          onClick={(e) => {
            e.preventDefault();
            handleNavLinkClick('#studio');
          }}
          className="mt-4 button-primary"
        >
          Get Started
        </a>
      </div>
    </header>
  );
};

export default Navbar;
