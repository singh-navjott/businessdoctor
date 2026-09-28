import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactForm from './ContactForm';

export default function PopupForm() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if it has been shown in this session
    const hasSeenPopup = sessionStorage.getItem('hasSeenPopup');
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenPopup', 'true');
      }, 3000); // 3 seconds delay

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="bg-primary px-6 py-5 flex items-center justify-between text-white">
              <h2 className="text-xl font-bold">Get a Free Consultation</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-8">
              <p className="text-gray-600 mb-6 text-sm">
                Fill out the form below and our experts will get back to you with a customized growth plan.
              </p>
              <ContactForm source="Popup" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
