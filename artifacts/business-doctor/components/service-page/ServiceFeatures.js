import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { fadeUp, staggerContainer } from '../../lib/motion';

const features = ['on-page SEO', 'technical SEO', 'local SEO', 'keyword-targeted content'];

export default function ServiceFeatures() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h2 className="display text-3xl font-extrabold text-primary md:text-4xl">SEO Services</h2>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <motion.div variants={fadeUp} key={feature} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-growth-light text-growth"><Check size={19} /></span>
              <h3 className="display mt-7 text-lg font-bold capitalize text-primary">{feature}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}