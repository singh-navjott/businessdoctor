import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import WhatWeDo from '../components/home/WhatWeDo';
import ServicesDetail from '../components/home/ServicesDetail';
import PricingTable from '../components/home/PricingTable';
import WhoWeWorkWith from '../components/home/WhoWeWorkWith';
import AreasWeServe from '../components/home/AreasWeServe';
import FAQ from '../components/home/FAQ';
import CTABand from '../components/home/CTABand';
import { faqItems } from '../lib/content';
import { faqSchema, localBusinessSchema, pageMeta } from '../lib/seo';

export default function Home() {
  const meta = pageMeta({
    title: 'Digital Marketing Agency in Delhi NCR | Business Doctor',
    description: 'Business Doctor is a full-service digital marketing agency in Delhi NCR offering SEO, PPC, social media, web development, and more — with transparent pricing.',
  });
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:title" content={meta.title} /><meta property="og:description" content={meta.description} /><meta property="og:image" content={meta.image} /><meta property="og:type" content="website" /><meta property="og:url" content={meta.canonical} />
        <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={meta.title} /><meta name="twitter:description" content={meta.description} /><meta name="twitter:image" content={meta.image} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqItems)) }} />
      </Head>
      <Header />
      <Hero />
      <WhatWeDo />
      <ServicesDetail />
      <PricingTable />
      <WhoWeWorkWith />
      <AreasWeServe />
      <FAQ />
      <CTABand />
      <Footer />
    </>
  );
}

export function getStaticProps() {
  return { props: {} };
}