import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function ContactForm({ source = 'Contact' }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source })
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 p-8 rounded-2xl text-center flex flex-col items-center justify-center h-full">
        <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will contact you shortly.</p>
        <button onClick={() => setStatus('idle')} className="text-primary font-semibold hover:underline">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'error' && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
          {errorMessage}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
        <input 
          id="name"
          required 
          type="text" 
          value={formData.name} 
          onChange={(e) => setFormData(d => ({...d, name: e.target.value}))} 
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" 
          placeholder="John Doe"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
          <input 
            id="email"
            required 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData(d => ({...d, email: e.target.value}))} 
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" 
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Contact Number <span className="text-red-500">*</span></label>
          <input 
            id="phone"
            required 
            type="tel" 
            value={formData.phone} 
            onChange={(e) => setFormData(d => ({...d, phone: e.target.value}))} 
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" 
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-red-500">*</span></label>
        <textarea 
          id="message"
          required 
          rows={4} 
          value={formData.message} 
          onChange={(e) => setFormData(d => ({...d, message: e.target.value}))} 
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm resize-none" 
          placeholder="How can we help you?"
        />
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'} 
        className="w-full rounded-xl bg-primary px-4 py-4 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary/90 disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {status === 'loading' ? 'Submitting...' : 'Send Message'}
        {status !== 'loading' && <Send className="h-4 w-4" />}
      </button>
    </form>
  );
}
