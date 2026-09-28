import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

export default function CaseStudiesList() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCS = async () => {
    try {
      const res = await fetch('/api/admin/case-studies');
      if (res.ok) setCaseStudies(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCS();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      const res = await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' });
      if (res.ok) fetchCS();
    } catch (err) {
      console.error(err);
    }
  };

  const handleTogglePublish = async (cs) => {
    try {
      const res = await fetch(`/api/admin/case-studies/${cs.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cs, published: !cs.published })
      });
      if (res.ok) fetchCS();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Case Studies</h1>
        <Link href="/admin/case-studies/edit" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Create Case Study
        </Link>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs font-medium uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center">Loading...</td></tr>
              ) : caseStudies.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">No case studies found. Create one!</td></tr>
              ) : (
                caseStudies.map(cs => (
                  <tr key={cs.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{cs.title}</td>
                    <td className="px-6 py-4">{cs.clientName}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${cs.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {cs.published ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                        {cs.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleTogglePublish(cs)} className="text-gray-500 hover:text-primary p-1" title={cs.published ? 'Unpublish' : 'Publish'}>
                          {cs.published ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                        </button>
                        <Link href={`/admin/case-studies/edit?id=${cs.id}`} className="text-gray-500 hover:text-blue-600 p-1">
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button onClick={() => handleDelete(cs.id)} className="text-gray-500 hover:text-red-600 p-1">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
