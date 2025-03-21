
import { useState } from "react";
import { useInView } from "@/lib/animations";
import { Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import GenerationForm, { QuoteCategory } from "./scifi-generator/GenerationForm";
import QuoteDisplay, { GeneratedQuote } from "./scifi-generator/QuoteDisplay";
import QuoteActions from "./scifi-generator/QuoteActions";
import AboutTab from "./scifi-generator/AboutTab";
import { generateSciFiQuote, getRandomClassicQuote } from "@/services/quoteGenerator";

const SciFiGenerator = () => {
  const [theme, setTheme] = useState("");
  const [category, setCategory] = useState<QuoteCategory>("classic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuote, setGeneratedQuote] = useState<GeneratedQuote | null>(null);
  const { ref, isInView } = useInView();

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
      const quoteData = await generateSciFiQuote(theme, category);
      setGeneratedQuote(quoteData);
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
      const randomQuote = getRandomClassicQuote();
      setGeneratedQuote(randomQuote);
      setIsGenerating(false);
    }, 1000);
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
                <GenerationForm 
                  theme={theme}
                  setTheme={setTheme}
                  category={category}
                  setCategory={setCategory}
                  isGenerating={isGenerating}
                  onGenerate={generateQuote}
                />

                {/* 生成结果展示区 */}
                <QuoteDisplay 
                  isGenerating={isGenerating}
                  generatedQuote={generatedQuote}
                />

                {/* 控制按钮 */}
                <QuoteActions generatedQuote={generatedQuote} />
              </TabsContent>
              
              <TabsContent value="about">
                <AboutTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SciFiGenerator;
