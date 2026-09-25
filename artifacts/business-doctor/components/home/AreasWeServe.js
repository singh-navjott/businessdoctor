import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import { areas } from '../../lib/content';

export default function AreasWeServe() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title="Areas We Serve" intro="Business Doctor serves businesses across Delhi NCR, with a focus on Uttam Nagar and West Delhi, extending to Dwarka, Janakpuri, Rohini, Saket, South Delhi, Gurgaon (including Cyber City), Noida, Greater Noida, Faridabad, and Ghaziabad." />
        <div className="mt-9 flex max-w-4xl flex-wrap gap-3">
          {areas.map((area, index) => (
            <motion.span key={area} initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1, transition: { delay: index * .04, duration: .35 } }} viewport={{ once: true }} className={`rounded-full border px-4 py-2 text-sm font-medium ${index === 0 ? 'border-primary bg-primary text-white' : 'border-neutral-200 bg-neutral-50 text-primary'}`}>{area}</motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}