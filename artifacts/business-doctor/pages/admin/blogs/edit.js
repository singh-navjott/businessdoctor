import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';

export default function BlogEdit() {
  const router = useRouter();
  const { id } = router.query;
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '', slug: '', featuredImage: '', category: '', tags: '',
    excerpt: '', content: '', author: '', seoTitle: '', seoDescription: '',
    ogImage: '', published: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/blogs/${id}`)
        .then(res => res.json())
        .then(data => {
          // If the API doesn't have a GET /[id] endpoint, we could fetch all and find,
          // but let's assume we can fetch all and find it since we didn't make a GET /[id]
          fetch('/api/admin/blogs')
            .then(r => r.json())
            .then(blogs => {
              const b = blogs.find(b => b.id === Number(id));
              if (b) setFormData(b);
            });
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSlugify = () => {
    setFormData(prev => ({ ...prev, slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isEdit ? `/api/admin/blogs/${id}` : '/api/admin/blogs';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) router.push('/admin/blogs');
      else alert('Failed to save blog');
    } catch (err) {
      console.error(err);
      alert('Error saving blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Blog' : 'Create Blog'}</h1>
        <Link href="/admin/blogs" className="text-sm font-medium text-gray-600 hover:text-gray-900">Back to List</Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} onBlur={!isEdit ? handleSlugify : undefined} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
            <input type="text" name="author" value={formData.author || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image URL</label>
            <input type="text" name="featuredImage" value={formData.featuredImage || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleChange} rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Content * (Markdown / HTML)</label>
            <textarea required name="content" value={formData.content} onChange={handleChange} rows={10} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-mono text-sm" />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Metadata</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
              <input type="text" name="seoTitle" value={formData.seoTitle || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
              <input type="text" name="seoDescription" value={formData.seoDescription || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
            <span className="text-sm font-medium text-gray-700">Published (Visible on website)</span>
          </label>
          
          <div className="flex gap-4">
            <Link href="/admin/blogs" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Cancel</Link>
            <button type="submit" disabled={loading} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-70">
              {loading ? 'Saving...' : 'Save Blog'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
