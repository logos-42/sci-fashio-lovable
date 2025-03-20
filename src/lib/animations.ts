
import { useEffect, useRef, useState } from 'react';

// Intersection Observer hook for triggering animations when elements come into view
export function useInView(options = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isInView };
}

// Parallax effect
export function useParallax(strength = 10) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      
      const moveX = ((x / width) - 0.5) * strength;
      const moveY = ((y / height) - 0.5) * strength;
      
      el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0, 0)';
      el.style.transition = 'transform 0.5s ease-out';
    };

    const handleMouseEnter = () => {
      el.style.transition = 'transform 0.1s ease-out';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [strength]);

  return ref;
}

// Staggered animation for children
export function staggerChildren(delayIncrement = 0.1) {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: delayIncrement
      }
    }
  };
}

// Smooth scrolling animation
export function scrollToElement(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  window.scrollTo({
    top: element.offsetTop - 100, // Adjust for header height
    behavior: 'smooth'
  });
}

// Image reveal animation for lazy loading
export function useImageReveal() {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    const image = imageRef.current;
    if (image && image.complete) {
      setIsLoaded(true);
    }
  }, []);

  return { imageRef, isLoaded, onLoad };
}

// Hover scale animation
export function useHoverScale(scale = 1.05) {
  const ref = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const handleMouseEnter = () => {
      element.style.transform = `scale(${scale})`;
    };
    
    const handleMouseLeave = () => {
      element.style.transform = 'scale(1)';
    };
    
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale]);
  
  return ref;
}

// Text typing animation
export function useTypewriterEffect(text: string, speed = 50) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    setIsComplete(false);

    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(typing);
      }
    }, speed);

    return () => clearInterval(typing);
  }, [text, speed]);

  return { displayText, isComplete };
}
