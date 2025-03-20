
import { useState, useEffect, useRef } from "react";

/**
 * Hook to check if an element is in the viewport
 */
export const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold,
      }
    );

    observer.observe(currentRef);
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isInView };
};

/**
 * Hook to create image reveal effect
 */
export const useImageReveal = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const onLoad = () => {
    setIsLoaded(true);
  };

  return { imageRef, isLoaded, onLoad };
};

/**
 * Hook to create hover scale effect
 */
export const useHoverScale = (scale = 1.05) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseEnter = () => {
      el.style.transform = `scale(${scale})`;
    };

    const handleMouseLeave = () => {
      el.style.transform = "scale(1)";
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [scale]);

  return ref;
};

/**
 * Helper function to scroll to an element by id
 */
export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
