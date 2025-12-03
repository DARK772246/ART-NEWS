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
  updatedAt?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${API_URL}/api/articles`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const response = await fetch(`${API_URL}/api/articles/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

export async function saveArticle(article: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>, editingId?: string) {
  try {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('No authentication token');
    }

    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('excerpt', article.excerpt);
    formData.append('content', article.content || '');
    formData.append('category', article.category);
    formData.append('author', article.author || '');
    formData.append('isHero', String(article.isHero || false));
    formData.append('isBreaking', String(article.isBreaking || false));

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/api/articles/${editingId}` : `${API_URL}/api/articles`;

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to save article');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to save article:', error);
    throw error;
  }
}

export async function deleteArticle(id: string) {
  try {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${API_URL}/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to delete article');
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to delete article:', error);
    throw error;
  }
}

