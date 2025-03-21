
import { useState } from "react";
import { Wand2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// 类型定义
export type QuoteCategory = "classic" | "chinese" | "movies" | "scientists";

export const categoryOptions = [
  { value: "classic", label: "经典科幻" },
  { value: "chinese", label: "中国科幻" },
  { value: "movies", label: "科幻电影" },
  { value: "scientists", label: "科学家名言" },
];

interface GenerationFormProps {
  theme: string;
  setTheme: (theme: string) => void;
  category: QuoteCategory;
  setCategory: (category: QuoteCategory) => void;
  isGenerating: boolean;
  onGenerate: () => void;
}

const GenerationForm = ({
  theme,
  setTheme,
  category,
  setCategory,
  isGenerating,
  onGenerate
}: GenerationFormProps) => {
  return (
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
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full button-primary flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <Wand2 className="animate-spin mr-2" />
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
  );
};

export default GenerationForm;
