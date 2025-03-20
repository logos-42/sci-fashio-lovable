
import { useState, useEffect } from "react";
import { useImageReveal, useHoverScale } from "@/lib/animations";

interface SciFiQuoteCardProps {
  image: string;
  quote: string;
  source: string;
  category: string;
  delay?: number;
}

const SciFiQuoteCard = ({ image, quote, source, category, delay = 0 }: SciFiQuoteCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { imageRef, isLoaded, onLoad } = useImageReveal();
  const cardRef = useHoverScale(1.02);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`group relative rounded-2xl overflow-hidden shadow-subtle transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      ref={cardRef as React.RefObject<HTMLDivElement>}
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        {/* Image blur overlay before image loads */}
        <div 
          className={`absolute inset-0 backdrop-blur-sm bg-gray-100/50 transition-opacity duration-500 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        />
        
        <img
          ref={imageRef as React.RefObject<HTMLImageElement>}
          src={image}
          alt={source}
          onLoad={onLoad}
          className={`object-cover w-full h-full transition-all duration-700 ${
            isLoaded ? "scale-100 filter-none" : "scale-105 blur-sm"
          }`}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="chip mb-2">{category}</div>
        <blockquote className="text-white font-medium text-sm">"{quote.length > 50 ? quote.substring(0, 50) + '...' : quote}"</blockquote>
        <p className="text-white/80 text-xs mt-1">{source}</p>
      </div>
    </div>
  );
};

export default SciFiQuoteCard;
