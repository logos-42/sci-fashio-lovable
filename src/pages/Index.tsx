
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SciFiGenerator from "@/components/SciFiGenerator";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay and set page as loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Page transition animations
  const pageClasses = isLoaded
    ? "opacity-100 transition-opacity duration-500"
    : "opacity-0";

  return (
    <div className={pageClasses}>
      <Navbar />
      
      <main>
        <Hero />
        <SciFiGenerator />
        
        {/* 关于区域 */}
        <section id="about" className="section-padding bg-gray-50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="chip mb-4">关于工具</div>
              <h2 className="heading-lg mb-6">
                基于DeepSeek API的科幻灵感生成器
              </h2>
              <p className="body-md text-gray-600 mb-6">
                本工具利用DeepSeek大语言模型，为科幻爱好者、作家和创意工作者提供灵感来源。
                系统可以创作全新的科幻名言警句，而不仅仅是摘抄已有的经典语录。
              </p>
              <p className="body-md text-gray-600 mb-8">
                无论您是寻找创作灵感，还是希望获取有深度的科幻引述，我们的AI都能满足您的需求。
                探索宇宙的奥秘，感受科幻的魅力，一切尽在这里。
              </p>
              <button className="button-primary">
                了解更多DeepSeek技术
              </button>
            </div>
          </div>
        </section>
        
        {/* 号召性用语区域 */}
        <section className="py-16">
          <div className="section-container">
            <div className="bg-gradient-to-r from-indigo-900 to-purple-950 rounded-2xl p-8 md:p-12 text-white text-center">
              <h2 className="heading-md mb-6 max-w-xl mx-auto">
                准备好探索科幻的无限可能了吗？
              </h2>
              <p className="body-md text-indigo-200 mb-8 max-w-lg mx-auto">
                立即开始使用我们的科幻名言生成器，获取灵感，创作原创，探索未来。
              </p>
              <button className="button-primary bg-white text-indigo-900 hover:bg-indigo-100">
                立即开始创作
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
