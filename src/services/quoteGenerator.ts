
import { GeneratedQuote } from "@/components/scifi-generator/QuoteDisplay";
import { QuoteCategory } from "@/components/scifi-generator/GenerationForm";

// DeepSeek API key
const DEEPSEEK_API_KEY = "SK-392A95FC7D2445F6B6C79C17725192D1";

// 生成科幻名言
export const generateSciFiQuote = async (theme: string, category: QuoteCategory): Promise<GeneratedQuote> => {
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
    
    console.log("开始调用DeepSeek API生成科幻名言...");
    console.log("API Key:", DEEPSEEK_API_KEY);
    
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
    console.log("DeepSeek API返回数据:", data);
    
    if (data.error) {
      console.error("DeepSeek API错误:", data.error);
      throw new Error(data.error.message || "API调用失败");
    }
    
    if (data.choices && data.choices.length > 0 && data.choices[0].message.content) {
      const responseText = data.choices[0].message.content;
      console.log("DeepSeek API返回文本:", responseText);
      
      try {
        // 尝试提取和解析JSON响应
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const jsonStr = jsonMatch[0];
          const quoteData = JSON.parse(jsonStr);
          return quoteData as GeneratedQuote;
        } else {
          // 如果没有找到JSON格式，使用文本作为名言
          return { text: responseText };
        }
      } catch (e) {
        console.error("解析JSON失败:", e);
        // 如果不是有效的JSON，直接使用文本
        return { text: responseText };
      }
    } else {
      // 处理错误
      const errorMessage = data.error?.message || "生成失败，请重试";
      console.error("API错误:", errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("生成科幻名言失败:", error);
    throw error;
  }
};

// 获取随机经典科幻名言
export const getRandomClassicQuote = (): GeneratedQuote => {
  const classicQuotes = [
    { text: "恐惧是思维的杀手，恐惧是带来彻底毁灭的小小死神。", source: "沙丘", author: "弗兰克·赫伯特" },
    { text: "弱小和无知不是生存的障碍，傲慢才是。", source: "三体", author: "刘慈欣" },
    { text: "宇宙就像一本书，那些不旅行的人只读了其中一页。", author: "阿西莫夫" },
    { text: "任何足够先进的技术都与魔法无异。", author: "阿瑟·C·克拉克" },
    { text: "我们是宇宙观察自身的方式。", author: "卡尔·萨根" }
  ];
  
  return classicQuotes[Math.floor(Math.random() * classicQuotes.length)];
};
