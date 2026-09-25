import { motion } from 'framer-motion';
import Button from '../shared/Button';
import { fadeUp } from '../../lib/motion';

export default function CTABand() {
  return (
    <motion.section variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: .3 }} className="bg-primary px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="display max-w-2xl text-3xl font-extrabold text-white md:text-4xl">Ready to grow your business in Delhi NCR?</h2>
        <Button href="#faq" className="shrink-0">Get a Free Quote</Button>
      </div>
    </motion.section>
  );
}