import { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Users, FileText, Briefcase, FileSpreadsheet } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalCaseStudies: 0,
    publishedCaseStudies: 0,
    totalLeads: 0,
    newLeads: 0
  });

  useEffect(() => {
    // In a real app, this would fetch from an API endpoint like /api/admin/stats
    // For now, we simulate fetching stats from individual endpoints
    const fetchStats = async () => {
      try {
        const [blogsRes, csRes, leadsRes] = await Promise.all([
          fetch('/api/admin/blogs'),
          fetch('/api/admin/case-studies'),
          fetch('/api/admin/leads')
        ]);
        
        if (blogsRes.ok && csRes.ok && leadsRes.ok) {
          const blogs = await blogsRes.json();
          const caseStudies = await csRes.json();
          const leads = await leadsRes.json();
          
          setStats({
            totalBlogs: blogs.length,
            publishedBlogs: blogs.filter(b => b.published).length,
            totalCaseStudies: caseStudies.length,
            publishedCaseStudies: caseStudies.filter(c => c.published).length,
            totalLeads: leads.length,
            newLeads: leads.filter(l => l.status === 'New').length
          });
        }
      } catch (err) {
        console.error('Failed to load stats', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Total Leads" value={stats.totalLeads} subtitle={`${stats.newLeads} new leads`} icon={Users} color="bg-blue-50 text-blue-600" />
        <StatCard title="Published Blogs" value={stats.publishedBlogs} subtitle={`${stats.totalBlogs - stats.publishedBlogs} drafts`} icon={FileText} color="bg-emerald-50 text-emerald-600" />
        <StatCard title="Case Studies" value={stats.publishedCaseStudies} subtitle={`${stats.totalCaseStudies - stats.publishedCaseStudies} drafts`} icon={Briefcase} color="bg-orange-50 text-orange-600" />
        <StatCard title="Total Content" value={stats.totalBlogs + stats.totalCaseStudies} subtitle="Published & Drafts" icon={FileSpreadsheet} color="bg-purple-50 text-purple-600" />
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Welcome back!</h2>
        <p className="text-gray-600">Select an option from the sidebar to manage your content and view recent leads.</p>
      </div>
    </AdminLayout>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-100 flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      <div className={`rounded-lg p-3 ${color}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}
