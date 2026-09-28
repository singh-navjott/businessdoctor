import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Phone, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [lead, setLead] = useState({ name: '', phone: '', email: '', company: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setChatOpen(false);
      }
    };
    if (chatOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [chatOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhone = () => {
    window.location.href = 'tel:+919599249586';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919599249586', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Call Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePhone}
        aria-label="Call Us"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors hover:bg-primary/90"
      >
        <Phone className="h-5 w-5" />
      </motion.button>

      {/* WhatsApp Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsApp}
        aria-label="WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-colors hover:bg-[#20bd5a]"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M12.031 0C5.397 0 .013 5.378.013 12.012c0 2.122.553 4.195 1.604 6.01L.003 24l6.126-1.607c1.748.956 3.705 1.459 5.897 1.46h.005c6.634 0 12.018-5.378 12.018-12.013 0-3.216-1.251-6.237-3.526-8.513C18.252 1.25 15.241.002 12.031 0zm0 21.848c-1.796 0-3.553-.483-5.093-1.396l-.365-.216-3.784.992.993-3.69-.237-.377c-1.003-1.597-1.534-3.447-1.534-5.15C1.986 6.488 6.482 1.996 12.026 1.996c2.68 0 5.201 1.045 7.095 2.94 1.895 1.897 2.94 4.417 2.94 7.098 0 5.526-4.496 10.016-10.03 10.016v-.002zm5.5-7.518c-.302-.152-1.785-.88-2.062-.982-.277-.101-.479-.152-.68.152-.202.302-.781.982-.958 1.183-.176.202-.353.227-.655.076-1.428-.718-2.451-1.31-3.411-3.324-.202-.424.32-.41.91-.986.076-.076.101-.127.151-.228.05-.101.025-.19-.013-.266-.038-.076-.68-1.643-.932-2.25-.246-.593-.496-.512-.68-.521h-.58c-.202 0-.529.076-.806.379-.277.303-1.058 1.036-1.058 2.527 0 1.491 1.083 2.932 1.234 3.134.151.202 2.138 3.266 5.176 4.577.721.311 1.284.497 1.722.637.723.23 1.381.197 1.9.119.58-.088 1.785-.73 2.037-1.436.252-.705.252-1.31.176-1.436-.076-.127-.277-.203-.58-.354z"/>
        </svg>
      </motion.button>

      {/* Chatbot Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            ref={chatRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 mb-4 w-[calc(100vw-3rem)] sm:w-[380px] origin-bottom-right rounded-2xl bg-white shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            <div className="bg-primary px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 font-bold text-sm">+</span>
                <span className="font-semibold tracking-tight">Business Doctor</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-gray-600">Thanks for reaching out. Our team will contact you shortly.</p>
                  <button onClick={() => { setSubmitted(false); setChatOpen(false); }} className="mt-6 text-sm font-medium text-primary hover:underline">Close Chat</button>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">+</div>
                    <div className="rounded-2xl rounded-tl-none bg-white p-3 text-sm text-gray-700 shadow-sm border border-gray-100">
                      Hi! 👋 Welcome to Business Doctor. <br/> How can we help grow your business?
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input required type="text" placeholder="Your Name" value={lead.name} onChange={(e) => setLead(l => ({...l, name: e.target.value}))} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" />
                    <input required type="tel" placeholder="Phone Number" value={lead.phone} onChange={(e) => setLead(l => ({...l, phone: e.target.value}))} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" />
                    <input type="email" placeholder="Email Address (Optional)" value={lead.email} onChange={(e) => setLead(l => ({...l, email: e.target.value}))} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" />
                    <select required value={lead.service} onChange={(e) => setLead(l => ({...l, service: e.target.value}))} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm bg-white">
                      <option value="" disabled>Select Service</option>
                      <option value="SEO">SEO</option>
                      <option value="PPC">PPC / Ads</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Web Development">Web Development</option>
                      <option value="Other">Other</option>
                    </select>
                    <textarea required placeholder="Tell us about your requirement..." rows={3} value={lead.message} onChange={(e) => setLead(l => ({...l, message: e.target.value}))} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-sm" />
                    <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-primary/90 disabled:opacity-70 flex items-center justify-center gap-2">
                      {loading ? 'Sending...' : 'Send Message'}
                      {!loading && <Send className="h-4 w-4" />}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Toggle Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setChatOpen(!chatOpen)}
        aria-label="Toggle Chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-xl transition-colors hover:bg-orange-600"
      >
        {chatOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>
    </div>
  );
}

// Temporary CheckCircle icon to avoid another import if missing
function CheckCircle(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
}
