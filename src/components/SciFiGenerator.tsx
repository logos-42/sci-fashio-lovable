
import { useState, useEffect, useRef } from "react";
import { useInView } from "@/lib/animations";
import { Sparkles, ChevronRight, Wand2, Copy, Share2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// DeepSeek API key
const DEEPSEEK_API_KEY = "SK-392A95FC7D2445F6B6C79C17725192D1";

// 类型定义
type QuoteCategory = "classic" | "chinese" | "movies" | "scientists";
type GeneratedQuote = {
  text: string;
  author?: string;
  source?: string;
};

const categoryOptions = [
  { value: "classic", label: "经典科幻" },
  { value: "chinese", label: "中国科幻" },
  { value: "movies", label: "科幻电影" },
  { value: "scientists", label: "科学家名言" },
];

const SciFiGenerator = () => {
  const [theme, setTheme] = useState("");
  const [category, setCategory] = useState<QuoteCategory>("classic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<GeneratedQuote | null>(null);
  const { ref, isInView } = useInView();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const designAreaRef = useRef<HTMLDivElement>(null);

  // 跟踪鼠标位置创建交互效果
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

  // 生成科幻名言
  const generateQuote = async () => {
    if (!theme.trim() && category === "classic") {
      // 如果没有主题，生成经典科幻名言
      generateRandomQuote();
      return;
    }
    
    setIsGenerating(true);
    setGeneratedQuote(null);
    
    try {
      // 根据选择的类别和主题创建提示词
      let prompt = "";
      
      switch(category) {
        case "classic":
          prompt = `创造一句原创的科幻名言或警句，主题是关于"${theme || "宇宙"}"。不要引用已有的名言，而是创造全新的名言。请直接返回JSON格式：{"text": "名言内容", "author": "架空的科幻作家名", "source": "架空的科幻作品名"}`;
          break;
        case "chinese":
          prompt = `创造一句原创的中国风科幻名言或警句，主题是关于"${theme || "文明"}"。不要引用已有的名言，而是创造全新的名言。请直接返回JSON格式：{"text": "名言内容", "author": "架空的中国科幻作家名", "source": "架空的中国科幻作品名"}`;
          break;
        case "movies":
          prompt = `创造一句原创的科幻电影台词，主题是关于"${theme || "未来"}"。不要引用已有的台词，而是创造全新的台词。请直接返回JSON格式：{"text": "台词内容", "author": "架空的科幻电影角色名", "source": "架空的科幻电影名"}`;
          break;
        case "scientists":
          prompt = `创造一句原创的未来科学家关于科学或宇宙的名言，主题是关于"${theme || "探索"}"。不要引用已有的名言，而是创造全新的名言。请直接返回JSON格式：{"text": "名言内容", "author": "架空的未来科学家名"}`;
          break;
      }
      
      // 调用DeepSeek API
      const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "system",
              content: "你是一个专门创作原创科幻名言警句的AI助手。请直接以JSON格式返回结果，不要有任何额外解释或前后缀。"
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices.length > 0 && data.choices[0].message.content) {
        const responseText = data.choices[0].message.content;
        console.log("DeepSeek API response:", responseText);
        
        try {
          // 尝试提取和解析JSON响应
          const jsonMatch = responseText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const jsonStr = jsonMatch[0];
            const quoteData = JSON.parse(jsonStr);
            setGeneratedQuote(quoteData);
          } else {
            // 如果没有找到JSON格式，使用文本作为名言
            setGeneratedQuote({ text: responseText });
          }
        } catch (e) {
          console.error("解析JSON失败:", e);
          // 如果不是有效的JSON，直接使用文本
          setGeneratedQuote({ text: responseText });
        }
      } else {
        // 处理错误
        const errorMessage = data.error?.message || "生成失败，请重试";
        console.error("API错误:", errorMessage);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("生成科幻名言失败:", error);
      toast.error("生成失败，请重试");
      // 如果API调用失败，使用随机名言
      generateRandomQuote();
    } finally {
      setIsGenerating(false);
    }
  };

  // 生成随机经典科幻名言
  const generateRandomQuote = () => {
    setIsGenerating(true);
    setGeneratedQuote(null);
    
    // 模拟API调用延迟
    setTimeout(() => {
      const classicQuotes = [
        { text: "恐惧是思维的杀手，恐惧是带来彻底毁灭的小小死神。", source: "沙丘", author: "弗兰克·赫伯特" },
        { text: "弱小和无知不是生存的障碍，傲慢才是。", source: "三体", author: "刘慈欣" },
        { text: "宇宙就像一本书，那些不旅行的人只读了其中一页。", author: "阿西莫夫" },
        { text: "任何足够先进的技术都与魔法无异。", author: "阿瑟·C·克拉克" },
        { text: "我们是宇宙观察自身的方式。", author: "卡尔·萨根" }
      ];
      
      const randomQuote = classicQuotes[Math.floor(Math.random() * classicQuotes.length)];
      setGeneratedQuote(randomQuote);
      setIsGenerating(false);
    }, 1000);
  };

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
    <section 
      id="generator" 
      className="section-padding bg-gradient-to-b from-white to-gray-50"
      ref={ref}
    >
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="chip mb-4">AI工作室</div>
          <h2 className="heading-lg mb-6">
            科幻名言生成器
          </h2>
          <p className="body-md text-gray-600 max-w-xl mx-auto mb-8">
            输入主题关键词，AI将为您创作原创科幻名言警句。
            支持经典科幻、中国科幻、科幻电影和科学家名言多种风格。
          </p>
        </div>

        <div className={`max-w-4xl mx-auto bg-white rounded-2xl shadow-elevated overflow-hidden transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
          {/* 生成器头部 */}
          <div className="bg-indigo-950 text-white p-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            <h3 className="font-medium">科幻名言生成工作室</h3>
          </div>

          {/* 生成器内容 */}
          <div className="p-6">
            <Tabs defaultValue="generate" className="mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="generate">生成名言</TabsTrigger>
                <TabsTrigger value="about">关于工具</TabsTrigger>
              </TabsList>
              
              <TabsContent value="generate">
                {/* 输入表单 */}
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        选择类别
                      </label>
                      <Select
                        value={category}
                        onValueChange={(value) => setCategory(value as QuoteCategory)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="选择名言类别" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        输入主题关键词（可选）
                      </label>
                      <div className="relative">
                        <Input
                          type="text"
                          value={theme}
                          onChange={(e) => setTheme(e.target.value)}
                          placeholder="例如：宇宙、命运、时间、人性..."
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={generateQuote}
                    disabled={isGenerating}
                    className="w-full button-primary flex items-center justify-center"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="animate-spin mr-2" />
                        正在创作原创名言...
                      </>
                    ) : (
                      <>
                        <Wand2 className="mr-2" />
                        创作科幻名言
                      </>
                    )}
                  </button>
                </div>

                {/* 生成结果展示区 */}
                <div 
                  ref={designAreaRef}
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

                {/* 控制按钮 */}
                {generatedQuote && (
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
                )}
              </TabsContent>
              
              <TabsContent value="about">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-lg mb-3">关于科幻名言生成器</h4>
                  <p className="mb-3 text-gray-700">
                    本工具使用DeepSeek AI模型，可以创作原创科幻名言警句，不只是摘抄已有的经典语录。
                  </p>
                  <p className="mb-3 text-gray-700">
                    支持多种风格，包括经典科幻、中国科幻、科幻电影台词以及未来科学家的名言警句。
                  </p>
                  <p className="text-gray-700">
                    每次生成的内容都是独一无二的，为您的创作提供全新灵感。
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SciFiGenerator;
