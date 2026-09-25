import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionHeading from '../shared/SectionHeading';
import AnimatedCounter from '../shared/AnimatedCounter';
import { detailedServices } from '../../lib/content';
import { fadeUp, subtleScale } from '../../lib/motion';

export default function ServicesDetail() {
  return (
    <section id="services" className="bg-neutral-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title="Our Services in Delhi NCR" />
        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {detailedServices.map((service, index) => (
            <motion.article key={service.title} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${index % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <motion.div variants={subtleScale} className="overflow-hidden rounded-2xl border border-white bg-white p-2 shadow-card">
                <Image src={service.image} alt={service.alt} width={1000} height={750} className="aspect-[4/3] h-auto w-full rounded-xl object-cover" />
              </motion.div>
              <div>
                <h3 className="display text-2xl font-extrabold text-primary md:text-3xl">{service.title}</h3>
                <p className="prose-copy mt-5 text-base md:text-lg">{service.text}</p>
                {index === 1 && (
                  <div className="mt-7 grid grid-cols-3 gap-2 border-t border-neutral-200 pt-6">
                    <div><p className="text-2xl font-bold text-primary"><AnimatedCounter value={967} /></p><p className="mt-1 text-[11px] leading-4 text-neutral-600">conversations</p></div>
                    <div><p className="text-2xl font-bold text-primary"><AnimatedCounter value={7.4} prefix="₹" /></p><p className="mt-1 text-[11px] leading-4 text-neutral-600">per conversation</p></div>
                    <div><p className="text-2xl font-bold text-primary"><AnimatedCounter value={7155} prefix="₹" /></p><p className="mt-1 text-[11px] leading-4 text-neutral-600">total spend</p></div>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}