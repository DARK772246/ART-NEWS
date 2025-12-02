import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryArticle {
  id: string;
  title: string;
  image: string;
  time: string;
}

interface CategorySectionProps {
  title: string;
  articles: CategoryArticle[];
}

const categoriesData: { title: string; articles: CategoryArticle[] }[] = [
  {
    title: "Pakistan",
    articles: [
      {
        id: "pk1",
        title: "Economic Reforms Show Positive Impact on Growth Indicators",
        image: "https://images.unsplash.com/photo-1586016413664-864c0dd76f53?w=300&h=200&fit=crop",
        time: "2 hours ago",
      },
      {
        id: "pk2",
        title: "Infrastructure Development Projects Reach Key Milestones",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop",
        time: "4 hours ago",
      },
      {
        id: "pk3",
        title: "Cultural Festival Celebrates National Heritage",
        image: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=300&h=200&fit=crop",
        time: "6 hours ago",
      },
    ],
  },
  {
    title: "Technology",
    articles: [
      {
        id: "tech1",
        title: "Quantum Computing Breakthrough Opens New Possibilities",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop",
        time: "1 hour ago",
      },
      {
        id: "tech2",
        title: "Cybersecurity Innovations Protect Digital Infrastructure",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&h=200&fit=crop",
        time: "3 hours ago",
      },
      {
        id: "tech3",
        title: "Smartphone Industry Reveals Next Generation Devices",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
        time: "5 hours ago",
      },
    ],
  },
  {
    title: "Entertainment",
    articles: [
      {
        id: "ent1",
        title: "Acclaimed Film Receives International Recognition",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=200&fit=crop",
        time: "2 hours ago",
      },
      {
        id: "ent2",
        title: "Music Industry Embraces New Distribution Models",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop",
        time: "4 hours ago",
      },
      {
        id: "ent3",
        title: "Streaming Platforms Announce Exciting Original Content",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=300&h=200&fit=crop",
        time: "6 hours ago",
      },
    ],
  },
];

const CategoryBlock = ({ title, articles }: CategorySectionProps) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="headline-serif text-xl border-l-4 border-primary pl-3">{title}</h3>
      <Button variant="ghost" size="sm" className="text-xs group">
        More
        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
    <div className="space-y-3">
      {articles.map((article, index) => (
        <div
          key={article.id}
          className="group cursor-pointer flex gap-3 animate-fade-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="w-24 h-16 rounded overflow-hidden shrink-0">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h4>
            <span className="text-xs text-muted-foreground mt-1 block">{article.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const CategorySection = () => {
  return (
    <section className="container py-12">
      <div className="divider mb-8" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesData.map((category) => (
          <CategoryBlock key={category.title} title={category.title} articles={category.articles} />
        ))}
      </div>
    </section>
  );
};
