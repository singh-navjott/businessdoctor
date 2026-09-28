import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function LeadsList() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) setLeads(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      if (res.ok) fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
      </div>

      <div className="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs font-medium uppercase text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Name / Contact</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Company / Service</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center">Loading...</td></tr>
              ) : leads.length === 0 ? (
                <tr><td colSpan="6" className="px-6 py-8 text-center text-gray-500">No leads found.</td></tr>
              ) : (
                leads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                      <div className="text-xs">{lead.email}</div>
                      <div className="text-xs">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{lead.company}</div>
                      <div className="text-xs text-primary">{lead.service}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate" title={lead.message}>
                      {lead.message}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className={`rounded-lg border-gray-300 text-xs font-medium py-1 pl-2 pr-6 focus:ring-primary focus:border-primary
                          ${lead.status === 'New' ? 'bg-blue-50 text-blue-700' : ''}
                          ${lead.status === 'Contacted' ? 'bg-yellow-50 text-yellow-700' : ''}
                          ${lead.status === 'Qualified' ? 'bg-purple-50 text-purple-700' : ''}
                          ${lead.status === 'Converted' ? 'bg-green-50 text-green-700' : ''}
                          ${lead.status === 'Closed' ? 'bg-gray-100 text-gray-700' : ''}
                        `}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(lead.id)} className="text-gray-400 hover:text-red-600 font-medium text-xs">Delete</button>
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
