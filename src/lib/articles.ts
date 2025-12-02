export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  author?: string;
  time?: string;
  image?: string;
  video?: string;
  isBreaking?: boolean;
  isHero?: boolean;
  createdAt?: string;
}

const STORAGE_KEY = "artnews_articles";

const seedArticles: Article[] = [
  {
    id: "1",
    title: "Global Leaders Convene for Historic Summit on Future Technologies",
    excerpt:
      "World leaders and tech visionaries gather to discuss the transformative impact of artificial intelligence, sustainable innovation, and the future of global cooperation in an unprecedented summit.",
    content: "",
    category: "World",
    author: "Sarah Mitchell",
    time: "2 hours ago",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop",
    isHero: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Revolutionary AI System Achieves Breakthrough in Medical Research",
    excerpt: "New artificial intelligence platform demonstrates unprecedented accuracy in early disease detection.",
    category: "Technology",
    author: "James Chen",
    time: "4 hours ago",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Economic Markets Respond to New International Trade Agreements",
    excerpt: "Global markets show positive momentum following landmark trade deal announcements.",
    category: "Business",
    author: "Emily Watson",
    time: "5 hours ago",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Sustainable Energy Initiative Gains Global Momentum",
    excerpt: "Countries worldwide commit to ambitious renewable energy targets in coordinated effort.",
    category: "World",
    time: "1 hour ago",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Cultural Heritage Sites Receive Unprecedented Protection",
    excerpt: "New international framework ensures preservation of humanity's most treasured locations.",
    category: "Culture",
    time: "3 hours ago",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    createdAt: new Date().toISOString(),
  },
];

export function getArticles(): Article[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // seed initial data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedArticles));
      return seedArticles;
    }
    return JSON.parse(raw) as Article[];
  } catch (e) {
    console.error("Failed to read articles from localStorage", e);
    return seedArticles;
  }
}

export function saveArticle(article: Article) {
  const articles = getArticles();
  const idx = articles.findIndex((a) => a.id === article.id);
  if (idx >= 0) {
    articles[idx] = article;
  } else {
    articles.unshift(article);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

export function deleteArticle(id: string) {
  const articles = getArticles().filter((a) => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}
