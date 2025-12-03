import { Header } from "@/components/Header";
import { BreakingNews } from "@/components/BreakingNews";
import { HeroSection } from "@/components/HeroSection";
import { LatestNews } from "@/components/LatestNews";
import { TrendingSidebar } from "@/components/TrendingSidebar";
import { CategorySection } from "@/components/CategorySection";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { getArticles } from "@/lib/articles";

const Index = () => {
  const [hasArticles, setHasArticles] = useState<boolean | null>(null);

  useEffect(() => {
    const checkArticles = async () => {
      try {
        const articles = await getArticles();
        setHasArticles(Array.isArray(articles) && articles.length > 0);
      } catch {
        setHasArticles(false);
      }
    };
    
    checkArticles();
  }, []);

  return (
    <div className="min-h-screen bg-background dark">
      <Header />
      <BreakingNews />

      <main>
        <HeroSection />

        {/* Latest News with Trending Sidebar */}
        <section className="container py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LatestNews />
            </div>
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <TrendingSidebar />
              </div>
            </div>
          </div>
        </section>

        <CategorySection />

        {/* Empty state / CTA for adding articles (visible when there are no articles) */}
        {hasArticles === false && (
          <section className="container py-12">
            <div className="max-w-2xl mx-auto text-center p-8 border border-border rounded">
              <h2 className="headline-serif text-2xl mb-3">No articles yet</h2>
              <p className="text-muted-foreground mb-6">
                There is currently no content on the site. When you're ready, add your first article so readers
                can start seeing news here.
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href="/admin"
                  className="inline-block rounded bg-primary px-4 py-2 text-primary-foreground font-medium"
                >
                  Add Article
                </a>
                <a
                  href="/?admin=1"
                  className="inline-block rounded border border-border px-4 py-2 text-sm text-muted-foreground"
                >
                  Reveal Admin Controls
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
