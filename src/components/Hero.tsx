
import { useEffect, useRef } from "react";
import { useInView, scrollToElement } from "@/lib/animations";

const Hero = () => {
  const { ref, isInView } = useInView();
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!circleRef.current) return;
      
      // Subtle mouse parallax effect
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (clientX - centerX) / 50;
      const deltaY = (clientY - centerY) / 50;
      
      circleRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={circleRef} className="absolute right-[-10%] top-[-10%] w-[70%] h-[70%] rounded-full bg-design-light opacity-70 transition-transform duration-500 ease-out"></div>
        <div className="absolute left-[-5%] bottom-[-15%] w-[40%] h-[40%] rounded-full bg-design backdrop-blur-xs opacity-30"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl" ref={ref}>
          <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="chip mb-6">Design • AI • Fashion</div>
            <h1 className="heading-xl mb-6 text-balance">
              Create stunning fashion designs with the power of AI
            </h1>
            <p className="body-lg text-fashion-600 mb-8 max-w-2xl text-balance">
              Transform your ideas into beautiful fashion designs with our intelligent design studio. Unleash your creativity with AI-powered tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToElement('studio')}
                className="button-primary"
              >
                Start Designing
              </button>
              <button 
                onClick={() => scrollToElement('features')}
                className="button-secondary"
              >
                Explore Features
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
