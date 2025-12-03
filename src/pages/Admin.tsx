import { useState, useEffect } from "react";
import { saveArticle, getArticles, deleteArticle, Article } from "@/lib/articles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AdminLogin from "@/components/AdminLogin";
import { LogOut, Loader } from "lucide-react";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isHero, setIsHero] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Add noindex meta for admin page to avoid search engine indexing
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    return () => {
      try { document.head.removeChild(meta); } catch (e) {}
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      loadArticles();
    }
  }, []);

  const loadArticles = async () => {
    try {
      const data = await getArticles();
      setArticles(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Failed to load articles");
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => {
      setIsAuthenticated(true);
      loadArticles();
    }} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_login_time");
    setIsAuthenticated(false);
  };

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setAuthor("");
    setImageFile(null);
    setVideoFile(null);
    setIsHero(false);
    setIsBreaking(false);
    setEditingId(null);
  };

  const handleFileImage = (f?: File) => {
    if (f) setImageFile(f);
  };

  const handleFileVideo = (f?: File) => {
    if (f) setVideoFile(f);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt) {
      toast.error("Please provide at least a title and excerpt.");
      return;
    }

    setIsLoading(true);
    try {
      const articleData = {
        title,
        excerpt,
        content,
        category: category || "General",
        author: author || "Admin",
        isHero,
        isBreaking,
      };

      await saveArticle(articleData as any, editingId || undefined);
      await loadArticles();
      resetForm();
      toast.success(editingId ? "Article updated" : "Article saved");
    } catch (error) {
      toast.error("Failed to save article");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (a: Article) => {
    setEditingId(a.id);
    setTitle(a.title);
    setExcerpt(a.excerpt);
    setContent(a.content || "");
    setCategory(a.category || "");
    setAuthor(a.author || "");
    setIsHero(Boolean(a.isHero));
    setIsBreaking(Boolean(a.isBreaking));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return;
    
    setIsLoading(true);
    try {
      await deleteArticle(id);
      await loadArticles();
      toast.success("Article deleted");
    } catch (error) {
      toast.error("Failed to delete article");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="headline-serif text-2xl">RT NEWS Admin</h1>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Create New Article</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input 
                placeholder="Title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                disabled={isLoading}
              />
              <Input 
                placeholder="Excerpt" 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)}
                disabled={isLoading}
              />
              <Input 
                placeholder="Category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                disabled={isLoading}
              />
              <Input 
                placeholder="Author" 
                value={author} 
                onChange={(e) => setAuthor(e.target.value)}
                disabled={isLoading}
              />

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-sm block mb-2">Image</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileImage(e.target.files?.[0])} 
                    className="w-full"
                    disabled={isLoading}
                  />
                  {imageFile && <p className="text-xs text-green-600 mt-1">✓ {imageFile.name}</p>}
                </div>
                <div className="flex-1">
                  <label className="text-sm block mb-2">Video</label>
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={(e) => handleFileVideo(e.target.files?.[0])} 
                    className="w-full"
                    disabled={isLoading}
                  />
                  {videoFile && <p className="text-xs text-green-600 mt-1">✓ {videoFile.name}</p>}
                </div>
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isHero} 
                    onChange={(e) => setIsHero(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="text-sm">Mark as Hero</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isBreaking} 
                    onChange={(e) => setIsBreaking(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span className="text-sm">Mark as Breaking</span>
                </label>
              </div>

              <textarea 
                placeholder="Content" 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                disabled={isLoading}
                className="w-full min-h-[120px] p-3 bg-background border border-border rounded disabled:opacity-50"
              />
              
              <div className="flex gap-2">
                <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                  {isLoading && <Loader className="h-4 w-4 animate-spin" />}
                  {editingId ? "Update Article" : "Save Article"}
                </Button>
                {editingId && <Button variant="ghost" onClick={resetForm} disabled={isLoading}>Cancel</Button>}
              </div>
            </form>

            {(title || excerpt) && (
              <div className="mt-8 pt-8 border-t">
                <h3 className="font-semibold mb-4">Preview</h3>
                <div className="p-4 border rounded bg-background">
                  <h4 className="font-bold">{title || "(title)"}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{excerpt || "(excerpt)"}</p>
                  {imageFile && <p className="text-xs text-green-600 mt-2">📸 Image selected for upload</p>}
                  {videoFile && <p className="text-xs text-green-600 mt-2">🎥 Video selected for upload</p>}
                </div>
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Existing Articles ({articles.length})</h2>
            {articles.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No articles yet</p>
            ) : (
              <div className="space-y-3">
                {articles.map((a) => (
                  <div key={a.id} className="p-4 border rounded flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <div>
                        <div className="font-semibold">{a.title}</div>
                        <div className="text-sm text-muted-foreground">{a.excerpt}</div>
                        <div className="text-xs text-muted-foreground">{a.category} • {a.author}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(a)} disabled={isLoading}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(a.id)} disabled={isLoading}>Delete</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
