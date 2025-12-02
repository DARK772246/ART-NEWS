import { Clock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getArticles, Article } from "@/lib/articles";
import { useSearch } from "@/context/SearchContext";

export const HeroSection = () => {
  const [hero, setHero] = useState<Article | null>(null);
  const [secondary, setSecondary] = useState<Article[]>([]);
  const { searchQuery, selectedCategory } = useSearch();

  useEffect(() => {
    let articles = getArticles();

    // Filter by search query
    if (searchQuery) {
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "Latest") {
      articles = articles.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    const heroArticle = articles.find((a) => a.isHero) || articles[0] || null;
    const secondaryArticles = articles.filter((a) => a.id !== heroArticle?.id).slice(0, 2);
    setHero(heroArticle);
    setSecondary(secondaryArticles);
  }, [searchQuery, selectedCategory]);

  if (!hero) return null;

  return (
    <section className="container py-8">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Hero Article */}
        <div className="lg:col-span-2 group cursor-pointer animate-fade-up">
          <div className="card-news h-full">
            <div className="relative overflow-hidden aspect-[16/9]">
              {hero.image && (
                <img
                  src={hero.image}
                  alt={hero.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="tag-category">{hero.category}</span>
                <h2 className="headline-serif text-2xl md:text-3xl lg:text-4xl mt-2 text-foreground">
                  {hero.title}
                </h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground line-clamp-2">{hero.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {hero.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {hero.time || hero.createdAt}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Articles */}
        <div className="flex flex-col gap-6">
          {secondary.map((article, index) => (
            <div
              key={article.id}
              className={`group cursor-pointer card-news animate-fade-up animation-delay-${(index + 1) * 100}`}
            >
              <div className="relative overflow-hidden aspect-video">
                {article.image && (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-4">
                <span className="tag-category">{article.category}</span>
                <h3 className="headline-serif text-lg mt-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                  <span>{article.author}</span>
                  <span>{article.time || article.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
