
import { Copy, Share2 } from "lucide-react";
import { toast } from "sonner";
import { GeneratedQuote } from "./QuoteDisplay";

interface QuoteActionsProps {
  generatedQuote: GeneratedQuote | null;
}

const QuoteActions = ({ generatedQuote }: QuoteActionsProps) => {
  if (!generatedQuote) return null;

  // 复制到剪贴板
  const copyToClipboard = () => {
    if (!generatedQuote) return;
    
    let textToCopy = generatedQuote.text;
    if (generatedQuote.author) {
      textToCopy += ` —— ${generatedQuote.author}`;
      if (generatedQuote.source) {
        textToCopy += `《${generatedQuote.source}》`;
      }
    }
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast.success("已复制到剪贴板"))
      .catch(() => toast.error("复制失败"));
  };

  // 分享功能
  const shareQuote = () => {
    if (!generatedQuote) return;
    
    let shareText = encodeURIComponent(`"${generatedQuote.text}"`);
    if (generatedQuote.author) {
      shareText += encodeURIComponent(` —— ${generatedQuote.author}`);
      if (generatedQuote.source) {
        shareText += encodeURIComponent(`《${generatedQuote.source}》`);
      }
    }
    
    const shareUrl = `https://twitter.com/intent/tweet?text=${shareText}&hashtags=SciFi,AI`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="mt-6 flex justify-between items-center animate-fade-in">
      <button 
        onClick={copyToClipboard}
        className="button-secondary text-sm flex items-center"
      >
        <Copy className="mr-1 w-4 h-4" /> 复制名言
      </button>
      <button 
        onClick={shareQuote}
        className="button-primary text-sm flex items-center"
      >
        分享到社交媒体 <Share2 className="ml-1 w-4 h-4" />
      </button>
    </div>
  );
};

export default QuoteActions;
