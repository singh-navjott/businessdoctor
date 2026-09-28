import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';

export default function CaseStudyEdit() {
  const router = useRouter();
  const { id } = router.query;
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '', slug: '', clientName: '', industry: '', category: '', featuredImage: '',
    shortDescription: '', projectOverview: '', challenge: '', strategy: '', solution: '',
    implementation: '', results: '', technologies: '', seoTitle: '', seoDescription: '',
    ogImage: '', published: false
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/case-studies`)
        .then(r => r.json())
        .then(list => {
          const c = list.find(l => l.id === Number(id));
          if (c) setFormData(c);
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
      const url = isEdit ? `/api/admin/case-studies/${id}` : '/api/admin/case-studies';
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) router.push('/admin/case-studies');
      else alert('Failed to save case study');
    } catch (err) {
      console.error(err);
      alert('Error saving case study');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Case Study' : 'Create Case Study'}</h1>
        <Link href="/admin/case-studies" className="text-sm font-medium text-gray-600 hover:text-gray-900">Back to List</Link>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
            <input type="text" name="clientName" value={formData.clientName || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input type="text" name="industry" value={formData.industry || ''} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <textarea name="shortDescription" value={formData.shortDescription || ''} onChange={handleChange} rows={2} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Overview</label>
            <textarea name="projectOverview" value={formData.projectOverview || ''} onChange={handleChange} rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Challenge</label>
            <textarea name="challenge" value={formData.challenge || ''} onChange={handleChange} rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
            <textarea name="solution" value={formData.solution || ''} onChange={handleChange} rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Results</label>
            <textarea name="results" value={formData.results || ''} onChange={handleChange} rows={4} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary" />
            <span className="text-sm font-medium text-gray-700">Published (Visible on website)</span>
          </label>
          
          <div className="flex gap-4">
            <Link href="/admin/case-studies" className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Cancel</Link>
            <button type="submit" disabled={loading} className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white hover:bg-primary/90 disabled:opacity-70">
              {loading ? 'Saving...' : 'Save Case Study'}
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
