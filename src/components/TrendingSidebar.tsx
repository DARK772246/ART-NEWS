import { TrendingUp, Flame } from "lucide-react";

interface TrendingItem {
  id: string;
  rank: number;
  title: string;
  category: string;
  reads: string;
}

const trendingItems: TrendingItem[] = [
  {
    id: "t1",
    rank: 1,
    title: "Tech Giants Announce Revolutionary Partnership",
    category: "Technology",
    reads: "125K reads",
  },
  {
    id: "t2",
    rank: 2,
    title: "Climate Summit Reaches Historic Agreement",
    category: "Environment",
    reads: "98K reads",
  },
  {
    id: "t3",
    rank: 3,
    title: "Breaking: Major Policy Reform Announced",
    category: "Politics",
    reads: "87K reads",
  },
  {
    id: "t4",
    rank: 4,
    title: "Sports League Unveils New Season Format",
    category: "Sports",
    reads: "76K reads",
  },
  {
    id: "t5",
    rank: 5,
    title: "Entertainment Industry Sets New Records",
    category: "Entertainment",
    reads: "65K reads",
  },
];

export const TrendingSidebar = () => {
  return (
    <aside className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="h-5 w-5 text-primary" />
        <h3 className="headline-serif text-xl">Trending Now</h3>
      </div>

      <div className="space-y-4">
        {trendingItems.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
          >
            <span className="headline-serif text-3xl text-primary/30 group-hover:text-primary transition-colors">
              {String(item.rank).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <span className="tag-category text-xs">{item.category}</span>
              <h4 className="text-sm font-medium mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                {item.reads}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
