import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getArticles, Article } from "@/lib/articles";

export const BreakingNews = () => {
  const [items, setItems] = useState<Article[]>([]);

  useEffect(() => {
    const loadBreakingNews = async () => {
      try {
        const articles = await getArticles();
        const breaking = articles.filter((a) => a.isBreaking).slice(0, 10);
        setItems(breaking);
      } catch (error) {
        console.error("Failed to load breaking news:", error);
        setItems([]);
      }
    };
    
    loadBreakingNews();
  }, []);

  // fallback messages if no breaking articles
  const fallback = [
    "Major economic summit concludes with landmark agreements",
    "Technology conference unveils revolutionary AI developments",
    "International climate accord receives unprecedented support",
  ];

  const tickerItems = items.length ? items.map((a) => `• ${a.title}`) : fallback.map((t) => `• ${t}`);

  return (
    <div className="bg-primary text-primary-foreground overflow-hidden">
      <div className="container flex items-center">
        <div className="flex items-center gap-2 py-2 px-4 bg-primary-foreground/10 shrink-0">
          <AlertCircle className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Breaking</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div className="animate-ticker flex">
            {[...tickerItems, ...tickerItems].map((news, index) => (
              <span key={index} className="ticker-item text-sm">
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
