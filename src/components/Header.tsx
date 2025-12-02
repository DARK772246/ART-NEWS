import { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/context/SearchContext";
import { getArticles, Article } from "@/lib/articles";
import ThemeLangToggle from "@/components/ThemeLangToggle";

const categories = [
  "Latest",
  "Pakistan",
  "World",
  "Entertainment",
  "Technology",
  "Business",
  "Sports",
  "Opinion",
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useSearch();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setIsMenuOpen(false);
  };

  // Real-time search as user types
  useEffect(() => {
    if (searchQuery.trim()) {
      const allArticles = getArticles();
      const results = allArticles.filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      {/* Top Bar */}
      <div className="border-b border-border">
        <div className="container flex items-center justify-between py-2">
          <span className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <div className="flex items-center gap-4">
            <ThemeLangToggle />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <a href="/" className="inline-block" onClick={() => setSelectedCategory(null)}>
              <div className="flex items-center gap-3">
                <img 
                  src="/images/logo/rt-news-logo.png" 
                  alt="RT NEWS Logo" 
                  className="h-12 w-12 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <h1 className="headline-serif text-3xl md:text-4xl tracking-tighter">
                  RT <span className="text-primary">NEWS</span>
                </h1>
              </div>
            </a>
          </div>

          {/* Real-Time Search Bar */}
          <div className="flex-1 max-w-xs lg:max-w-md relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                className="pl-9 w-full"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-card border border-border rounded shadow-lg z-40 max-h-80 overflow-y-auto">
                {searchResults.map((article) => (
                  <a
                    key={article.id}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      // Scroll to article or navigate if needed
                      handleClearSearch();
                    }}
                    className="block p-3 border-b border-border hover:bg-secondary transition-colors last:border-b-0"
                  >
                    <h4 className="font-semibold text-sm line-clamp-1">{article.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{article.excerpt}</p>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded inline-block mt-1">
                      {article.category}
                    </span>
                  </a>
                ))}
              </div>
            )}

            {/* No Results Message */}
            {showResults && searchResults.length === 0 && searchQuery && (
              <div className="absolute top-full mt-2 w-full bg-card border border-border rounded p-3 text-center text-sm text-muted-foreground z-40">
                No articles found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border hidden lg:block">
        <div className="container">
          <ul className="flex items-center justify-center gap-8 py-3">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden border-t border-border bg-background animate-fade-up">
          <ul className="container py-4 space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className={`block py-2 text-sm font-medium transition-colors w-full text-left ${
                    selectedCategory === category
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
