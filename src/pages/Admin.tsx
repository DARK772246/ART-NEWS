import { useState, useEffect } from "react";
import { saveArticle, getArticles, deleteArticle, Article } from "@/lib/articles";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Admin = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [isHero, setIsHero] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setArticles(getArticles());
  }, []);

  const resetForm = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setCategory("");
    setAuthor("");
    setImage("");
    setVideo("");
    setIsHero(false);
    setIsBreaking(false);
    setEditingId(null);
  };

  const handleFileImage = async (f?: File) => {
    if (!f) return;
    try {
      const data = await readFileAsDataUrl(f);
      setImage(data);
    } catch (e) {
      toast.error("Failed to read image file");
    }
  };

  const handleFileVideo = async (f?: File) => {
    if (!f) return;
    try {
      const data = await readFileAsDataUrl(f);
      setVideo(data);
    } catch (e) {
      toast.error("Failed to read video file");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt) {
      toast.error("Please provide at least a title and excerpt.");
      return;
    }
    const article: Article = {
      id: editingId || Date.now().toString(),
      title,
      excerpt,
      content,
      category: category || "General",
      author: author || "Admin",
      image,
      video,
      isHero,
      isBreaking,
      createdAt: new Date().toISOString(),
    };
    saveArticle(article);
    setArticles(getArticles());
    resetForm();
    toast.success(editingId ? "Article updated" : "Article saved");
  };

  const handleEdit = (a: Article) => {
    setEditingId(a.id);
    setTitle(a.title);
    setExcerpt(a.excerpt);
    setContent(a.content || "");
    setCategory(a.category || "");
    setAuthor(a.author || "");
    setImage(a.image || "");
    setVideo(a.video || "");
    setIsHero(Boolean(a.isHero));
    setIsBreaking(Boolean(a.isBreaking));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    deleteArticle(id);
    setArticles(getArticles());
    toast.success("Article deleted");
  };

  return (
    <div className="container py-12">
      <h1 className="headline-serif text-2xl mb-6">Admin — Create Article</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 max-w-3xl">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />

        <div className="flex gap-3 items-center">
          <label className="text-sm">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileImage(e.target.files?.[0])}
          />
          <label className="text-sm">Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => handleFileVideo(e.target.files?.[0])}
          />
        </div>

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isHero} onChange={(e) => setIsHero(e.target.checked)} />
            <span className="text-sm">Mark as Hero</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={isBreaking} onChange={(e) => setIsBreaking(e.target.checked)} />
            <span className="text-sm">Mark as Breaking</span>
          </label>
        </div>

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] p-3 bg-background border border-border rounded"
        />
        <div>
          <Button type="submit">{editingId ? "Update Article" : "Save Article"}</Button>
          {editingId && (
            <Button variant="ghost" className="ml-2" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </form>

      {/* Preview */}
      <div className="mt-6 max-w-3xl">
        <h3 className="font-semibold mb-2">Preview</h3>
        <div className="p-4 border rounded">
          <h4 className="font-bold">{title || "(title)"}</h4>
          <p className="text-sm text-muted-foreground">{excerpt || "(excerpt)"}</p>
          {image && <img src={image} alt="preview" className="mt-3 max-h-48 object-cover w-full" />}
          {video && (
            <video controls src={video} className="mt-3 max-h-64 w-full" />
          )}
        </div>
      </div>

      <section className="mt-10">
        <h2 className="headline-serif text-xl mb-4">Existing Articles</h2>
        <div className="space-y-3">
          {articles.map((a) => (
            <div key={a.id} className="p-4 border rounded flex items-center justify-between">
              <div className="flex items-center gap-3">
                {a.image && <img src={a.image} alt={a.title} className="h-16 w-24 object-cover rounded" />}
                <div>
                  <div className="font-semibold">{a.title}</div>
                  <div className="text-sm text-muted-foreground">{a.excerpt}</div>
                  <div className="text-xs text-muted-foreground">{a.category} • {a.author}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="ghost" onClick={() => handleEdit(a)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(a.id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Admin;
