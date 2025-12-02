import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArticles, Article } from "@/lib/articles";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Share2 } from "lucide-react";

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);

  useEffect(() => {
    const articles = getArticles();
    const found = articles.find((a) => a.id === id);
    if (found) {
      setArticle(found);
      // Get related articles from same category
      const related = articles
        .filter((a) => a.category === found.category && a.id !== found.id)
        .slice(0, 3);
      setRelatedArticles(related);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Button onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {/* Article Header */}
        <div className="max-w-3xl">
          {/* Category & Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded">
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
                BREAKING
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="headline-serif text-4xl md:text-5xl mb-4">{article.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 text-muted-foreground border-b border-border pb-6 mb-6">
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
            )}
            {article.createdAt && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
              </div>
            )}
            <Button variant="ghost" size="sm" className="gap-2 w-fit">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="mb-8 rounded overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Excerpt */}
          <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>

          {/* Content */}
          {article.content && (
            <div className="prose prose-invert max-w-none mb-8">
              <p>{article.content}</p>
            </div>
          )}

          {/* Video */}
          {article.video && (
            <div className="mb-8 rounded overflow-hidden">
              <video
                controls
                src={article.video}
                className="w-full max-h-96 bg-black"
              />
            </div>
          )}

          {/* Placeholder content if no content */}
          {!article.content && (
            <div className="bg-card p-6 rounded border border-border mb-8">
              <p className="text-muted-foreground">
                Full article content will appear here. This article was created via the admin panel.
              </p>
            </div>
          )}
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border max-w-3xl">
            <h2 className="headline-serif text-2xl mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map((relArticle) => (
                <article
                  key={relArticle.id}
                  className="group cursor-pointer card-news"
                  onClick={() => navigate(`/article/${relArticle.id}`)}
                >
                  <div className="relative overflow-hidden aspect-video">
                    {relArticle.image && (
                      <img
                        src={relArticle.image}
                        alt={relArticle.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                      {relArticle.category}
                    </span>
                    <h3 className="headline-serif text-lg mt-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {relArticle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                      {relArticle.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
