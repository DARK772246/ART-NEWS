import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getArticles, Article } from "@/lib/articles";
import { useSearch } from "@/context/SearchContext";

// use the shared articles store (localStorage seeded)

export const LatestNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filtered, setFiltered] = useState<Article[]>([]);
  const { searchQuery, selectedCategory } = useSearch();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load articles:", error);
        setArticles([]);
      }
    };
    
    loadArticles();
  }, []);

  useEffect(() => {
    let result = articles.slice(0, 6);

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "Latest") {
      result = result.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    setFiltered(result);
  }, [articles, searchQuery, selectedCategory]);

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="headline-serif text-2xl md:text-3xl">Latest News</h2>
        <Button variant="ghost" className="group">
          View All
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found matching your search or category.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, index) => (
            <article
              key={article.id}
              className={`group cursor-pointer card-news animate-fade-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute top-3 left-3">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="headline-serif text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-1 mt-4 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {article.time || article.createdAt}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
