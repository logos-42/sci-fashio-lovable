
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/lib/animations";
import { Sparkles, ChevronRight, Wand2 } from "lucide-react";

const designPrompts = [
  "A modern silk qipao with subtle floral embroidery",
  "Minimalist linen suit with mandarin collar",
  "Traditional hanfu with contemporary details",
  "Streetwear-inspired changshan jacket"
];

const DesignerStudio = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState<string | null>(null);
  const { ref, isInView } = useInView();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const designAreaRef = useRef<HTMLDivElement>(null);

  // Simulated design generation
  const generateDesign = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedDesign(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would be an API call to an AI service
      setGeneratedDesign("/placeholder.svg");
      setIsGenerating(false);
    }, 2000);
  };

  // Track cursor for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!designAreaRef.current) return;
      
      const rect = designAreaRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const designArea = designAreaRef.current;
    if (designArea) {
      designArea.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (designArea) {
        designArea.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      id="studio" 
      className="section-padding bg-gradient-to-b from-white to-fashion-50"
      ref={ref}
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="chip mb-4">AI Studio</div>
          <h2 className="heading-lg mb-6">
            Transform your ideas into fashion designs
          </h2>
          <p className="body-md text-fashion-600 max-w-xl mx-auto mb-8">
            Describe your fashion concept, and our AI will visualize it for you instantly.
            Refine the details until you've created your perfect design.
          </p>
        </div>

        <div className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-elevated overflow-hidden transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {/* Studio Header */}
          <div className="bg-fashion-950 text-white p-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            <h3 className="font-medium">AI Fashion Studio</h3>
          </div>

          {/* Studio Content */}
          <div className="p-6">
            {/* Prompt Input */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-fashion-700 mb-2">
                Describe your fashion design
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Modern qipao with floral embroidery"
                  className="w-full p-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
                <button
                  onClick={generateDesign}
                  disabled={isGenerating || !prompt.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-fashion-500 hover:text-primary disabled:text-fashion-300 transition-colors"
                >
                  <Wand2 className="w-5 h-5" />
                </button>
              </div>

              {/* Example prompts */}
              <div className="mt-3">
                <p className="text-xs text-fashion-500 mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {designPrompts.map((examplePrompt, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(examplePrompt)}
                      className="text-xs px-3 py-1 bg-fashion-100 text-fashion-700 rounded-full hover:bg-fashion-200 transition-colors"
                    >
                      {examplePrompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Design Canvas */}
            <div 
              ref={designAreaRef}
              className="relative aspect-[4/3] border border-fashion-200 rounded-lg overflow-hidden bg-fashion-50 flex items-center justify-center"
            >
              {/* Interactive background effect */}
              <div
                className="absolute bg-gradient-to-r from-fashion-100/80 to-fashion-200/50 rounded-full blur-xl w-40 h-40 transition-all duration-300"
                style={{
                  transform: `translate(${cursorPosition.x / 5}px, ${cursorPosition.y / 5}px)`,
                  opacity: isGenerating ? 0.8 : 0.3
                }}
              ></div>
              
              {isGenerating ? (
                <div className="text-center animate-pulse">
                  <Sparkles className="w-12 h-12 text-fashion-400 mb-4 mx-auto animate-float" />
                  <p className="text-fashion-600">Generating your design...</p>
                </div>
              ) : generatedDesign ? (
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <img 
                    src={generatedDesign} 
                    alt="Generated fashion design" 
                    className="max-w-full max-h-full object-contain animate-scale-in"
                  />
                </div>
              ) : (
                <div className="text-center p-8">
                  <Wand2 className="w-12 h-12 text-fashion-300 mb-4 mx-auto" />
                  <p className="text-fashion-600 mb-2">Your design will appear here</p>
                  <p className="text-xs text-fashion-400">Enter a description and click the wand icon</p>
                </div>
              )}
            </div>

            {/* Controls */}
            {generatedDesign && (
              <div className="mt-6 flex justify-between items-center animate-fade-in">
                <button className="button-secondary text-sm">
                  Refine Design
                </button>
                <button className="button-primary text-sm flex items-center">
                  Continue to 3D View <ChevronRight className="ml-1 w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignerStudio;
