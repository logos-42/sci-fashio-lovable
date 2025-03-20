
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SciFiGenerator from "@/components/SciFiGenerator";
import Footer from "@/components/Footer";
import SciFiQuoteCard from "@/components/SciFiQuoteCard";

// 科幻名言数据示例
const sciFiQuotes = [
  {
    id: 1,
    quote: "恐惧是思维的杀手，恐惧是带来彻底毁灭的小小死神。",
    source: "《沙丘》弗兰克·赫伯特",
    category: "经典",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 2,
    quote: "弱小和无知不是生存的障碍，傲慢才是。",
    source: "《三体》刘慈欣",
    category: "中国科幻",
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 3,
    quote: "在无限的宇宙中，有无数的生命星球在歌唱，人类只不过是其中一首歌曲。",
    source: "《接触》卡尔·萨根",
    category: "经典",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: 4,
    quote: "宇宙就像一本书，那些不旅行的人只读了其中一页。",
    source: "阿西莫夫语录",
    category: "名人名言",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000"
  }
];

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
        
        {/* 科幻名言展示区 */}
        <section id="quotes" className="section-padding">
          <div className="section-container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="chip mb-4">星际灵感</div>
              <h2 className="heading-lg mb-6">
                经典科幻名言集锦
              </h2>
              <p className="body-md text-gray-600 max-w-xl mx-auto">
                探索科幻文学和电影中最具启发性的语录，从《沙丘》到《三体》，从阿西莫夫到卡尔·萨根。
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {sciFiQuotes.map((quote, index) => (
                <SciFiQuoteCard
                  key={quote.id}
                  image={quote.image}
                  quote={quote.quote}
                  source={quote.source}
                  category={quote.category}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* 关于区域 */}
        <section id="about" className="section-padding bg-gray-50">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <div className="chip mb-4">关于工具</div>
              <h2 className="heading-lg mb-6">
                基于Gemini API的科幻灵感生成器
              </h2>
              <p className="body-md text-gray-600 mb-6">
                本工具利用谷歌的Gemini大语言模型，为科幻爱好者、作家和创意工作者提供灵感来源。
                系统可以生成经典科幻作品中的名言，如《沙丘》、《三体》、《接触》等作品中的经典语录，
                以及阿西莫夫、卡尔·萨根等科幻巨匠的名人名言。
              </p>
              <p className="body-md text-gray-600 mb-8">
                无论您是寻找创作灵感，还是希望获取有深度的科幻引述，我们的AI都能满足您的需求。
                探索宇宙的奥秘，感受科幻的魅力，一切尽在这里。
              </p>
              <button className="button-primary">
                了解更多Gemini技术
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
                立即开始使用我们的科幻名言生成器，获取灵感，引用经典，创造未来。
              </p>
              <button className="button-primary bg-white text-indigo-900 hover:bg-indigo-100">
                立即开始生成
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
