import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../shared/Button';
import { staggerContainer, fadeUp } from '../../lib/motion';

export default function Hero() {
  return (
    <section className="hero-grid overflow-hidden bg-neutral-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-[1.02fr_.98fr] md:px-8 md:py-24">
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10">
          <motion.h1 variants={fadeUp} className="display max-w-2xl text-4xl font-extrabold leading-[1.08] text-primary md:text-6xl">Digital Marketing Agency in Delhi NCR</motion.h1>
          <motion.p variants={fadeUp} className="prose-copy mt-6 max-w-2xl text-base md:text-lg">Business Doctor is a full-service digital marketing agency based in Uttam Nagar, Delhi NCR. We handle SEO, Google and Meta Ads, social media management, web development, e-commerce management, and product photography for small businesses, startups, and local brands across Delhi NCR.</motion.p>
          <motion.p variants={fadeUp} className="mt-5 max-w-xl border-l-2 border-accent pl-4 text-sm font-medium leading-7 text-neutral-800">If you&apos;re looking for a digital marketing company in Delhi NCR that manages everything under one roof — from ranking your website on Google to running your ad campaigns — this is what we do and what it costs.</motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="#faq">Get a Free Quote</Button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0.4, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, ease: 'easeOut' }} className="relative">
          <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full border border-accent/30" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-2 shadow-card">
            <Image src="/images/hero/business-diagnostic-dashboard.png" alt="Business growth diagnostic dashboard for small businesses in Delhi NCR" width={1024} height={1024} priority fetchPriority="high" className="aspect-[4/3] h-auto w-full rounded-[1.5rem] object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-card">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-growth-light text-growth">✓</span>
            <span className="text-xs font-semibold leading-5 text-primary">Clear diagnosis.<br />Practical next step.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}