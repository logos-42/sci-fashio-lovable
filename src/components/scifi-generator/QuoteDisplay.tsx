
import { useRef, useState, useEffect } from "react";
import { Sparkles, Wand2 } from "lucide-react";

export interface GeneratedQuote {
  text: string;
  author?: string;
  source?: string;
}

interface QuoteDisplayProps {
  isGenerating: boolean;
  generatedQuote: GeneratedQuote | null;
}

const QuoteDisplay = ({ isGenerating, generatedQuote }: QuoteDisplayProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const displayAreaRef = useRef<HTMLDivElement>(null);

  // 跟踪鼠标位置创建交互效果
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!displayAreaRef.current) return;
      
      const rect = displayAreaRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    const displayArea = displayAreaRef.current;
    if (displayArea) {
      displayArea.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (displayArea) {
        displayArea.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div 
      ref={displayAreaRef}
      className="relative aspect-[4/3] border border-gray-200 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center"
    >
      {/* 交互背景效果 */}
      <div
        className="absolute bg-gradient-to-r from-indigo-100/80 to-purple-200/50 rounded-full blur-xl w-40 h-40 transition-all duration-300"
        style={{
          transform: `translate(${cursorPosition.x / 5}px, ${cursorPosition.y / 5}px)`,
          opacity: isGenerating ? 0.8 : 0.3
        }}
      ></div>
      
      {isGenerating ? (
        <div className="text-center animate-pulse">
          <Sparkles className="w-12 h-12 text-indigo-400 mb-4 mx-auto animate-float" />
          <p className="text-gray-600">正在创作原创科幻名言...</p>
        </div>
      ) : generatedQuote ? (
        <div className="w-full h-full p-8 flex flex-col items-center justify-center text-center max-w-2xl mx-auto animate-scale-in">
          <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-4 leading-relaxed">
            "{generatedQuote.text}"
          </blockquote>
          {generatedQuote.author && (
            <div className="text-gray-600">
              <span className="font-medium">—— {generatedQuote.author}</span>
              {generatedQuote.source && (
                <span className="ml-1">《{generatedQuote.source}》</span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8">
          <Wand2 className="w-12 h-12 text-gray-300 mb-4 mx-auto" />
          <p className="text-gray-600 mb-2">您的原创科幻名言将在这里显示</p>
          <p className="text-xs text-gray-400">输入主题关键词并点击生成按钮</p>
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;
