import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, BarChart3, Camera, Code2, Search, Share2, ShoppingBag } from 'lucide-react';
import SectionHeading from '../shared/SectionHeading';
import { serviceCards } from '../../lib/content';
import { fadeUp, staggerContainer } from '../../lib/motion';

const icons = { search: Search, chart: BarChart3, social: Share2, code: Code2, box: ShoppingBag, camera: Camera };

export default function WhatWeDo() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <SectionHeading title="What a Digital Marketing Agency Does" intro="A digital marketing agency manages the channels that bring customers to your business online. That includes:" />
        <motion.div variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((service) => {
            const Icon = icons[service.icon];
            return (
              <motion.div variants={fadeUp} key={service.title}>
                <Link href={service.href} className="focus-ring group block h-full rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-card-hover">
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-100 text-primary"><Icon size={21} strokeWidth={1.8} /></span>
                    <ArrowUpRight size={18} className="text-neutral-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                  <h3 className="display mt-7 text-xl font-bold text-primary">{service.title}</h3>
                  <p className="prose-copy mt-3 text-sm leading-6">{service.text}</p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        <p className="prose-copy mt-10 max-w-4xl text-base">Most businesses don&apos;t need all six at once. A new business usually starts with a website and local SEO. A business that already has traffic but low conversions usually needs paid ads or better product photography first. Where you start depends on where the gap in your funnel actually is — not on which package sounds biggest.</p>
      </div>
    </section>
  );
}