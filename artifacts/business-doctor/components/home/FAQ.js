import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import { faqItems } from '../../lib/content';

export default function FAQ({ items = faqItems }) {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="bg-neutral-50 py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-4 md:px-8">
        <SectionHeading title="Frequently Asked Questions" align="center" />
        <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map(([question, answer], index) => {
            const active = open === index;
            return (
              <div key={question}>
                <button type="button" aria-expanded={active} onClick={() => setOpen(active ? null : index)} className="focus-ring flex w-full items-center justify-between gap-5 py-5 text-left">
                  <span className="display text-base font-bold text-primary md:text-lg">{question}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-lg text-primary transition-transform ${active ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .28 }} className="overflow-hidden">
                      <p className="prose-copy pb-6 pr-12 text-sm md:text-base">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}