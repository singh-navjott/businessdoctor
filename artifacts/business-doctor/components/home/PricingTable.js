import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import { pricingRows } from '../../lib/content';
import { fadeUp, staggerContainer } from '../../lib/motion';

export default function PricingTable({ filtered = false }) {
  const rows = filtered ? pricingRows.slice(0, 3) : pricingRows;
  return (
    <section id="pricing" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title="Pricing" intro={'We publish our pricing because "contact us for a quote" doesn’t help you compare options. All prices below are current, standard rates — not a limited-time offer.'} />
        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-200">
          <div className="hidden grid-cols-[1.35fr_.8fr_1.2fr] gap-4 bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-[.12em] text-white/70 md:grid">
            <span>Service</span><span>Price</span><span>Notes</span>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: .1 }} className="divide-y divide-neutral-200">
            {rows.map(([service, price, note]) => (
              <motion.div variants={fadeUp} whileHover={{ scale: 1.01 }} key={service} className="grid gap-2 bg-white px-5 py-5 transition-shadow hover:relative hover:z-10 hover:shadow-card md:grid-cols-[1.35fr_.8fr_1.2fr] md:items-center md:gap-4 md:px-6">
                <span className="font-semibold text-primary">{service}</span>
                <span className="text-lg font-bold text-accent md:text-base">{price}</span>
                <span className="text-sm text-neutral-600">{note}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {!filtered && <p className="prose-copy mt-7 max-w-4xl text-sm">Need more than one service? We build custom packages combining SEO, ads, and social media based on your budget and goals — get in touch for a quote tailored to your business.</p>}
      </div>
    </section>
  );
}