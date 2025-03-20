
import { Instagram, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-fashion-950 text-white pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-serif text-2xl tracking-tight">Fashion</span>
              <span className="font-mono text-sm tracking-widest">AI</span>
            </div>
            <p className="text-fashion-300 text-sm mb-6 max-w-xs">
              Transforming fashion design with artificial intelligence. Create, visualize, and produce your designs seamlessly.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-fashion-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-fashion-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-fashion-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-fashion-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">AI Studio</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">3D Visualization</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Production</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Documentation</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Blog</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Examples</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-fashion-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-fashion-400 text-sm">
            &copy; {currentYear} Fashion AI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-8">
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Terms</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Privacy</a></li>
              <li><a href="#" className="text-fashion-400 hover:text-white text-sm transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
