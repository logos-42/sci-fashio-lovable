
const AboutTab = () => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-lg mb-3">关于科幻名言生成器</h4>
      <p className="mb-3 text-gray-700">
        本工具使用DeepSeek AI大模型，实时创作原创科幻名言警句，不只是摘抄已有的经典语录。
      </p>
      <p className="mb-3 text-gray-700">
        支持多种风格，包括经典科幻、中国科幻、科幻电影台词以及未来科学家的名言警句。
      </p>
      <p className="text-gray-700">
        每次生成的内容都是独一无二的，为您的创作提供全新灵感。当AI生成失败时，会自动显示经典名言作为备选。
      </p>
    </div>
  );
};

export default AboutTab;
