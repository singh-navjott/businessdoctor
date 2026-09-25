// DUMMY TEMPLATE — duplicate this file per service (ppc.js, smm.js, web-development.js, ecommerce.js, product-photography.js) and swap the content props.
import Head from 'next/head';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import ServiceHero from '../../components/service-page/ServiceHero';
import ServiceFeatures from '../../components/service-page/ServiceFeatures';
import ServiceProcess from '../../components/service-page/ServiceProcess';
import PricingTable from '../../components/home/PricingTable';
import FAQ from '../../components/home/FAQ';
import ServiceCTA from '../../components/service-page/ServiceCTA';
import { seoFaqItems } from '../../lib/content';
import { faqSchema, pageMeta } from '../../lib/seo';

export default function SEOService() {
  const intro = 'We handle on-page SEO, technical SEO, local SEO, and keyword-targeted content. If your business serves a specific area — Gurgaon, Noida, Dwarka, Rohini, Janakpuri, Saket, Faridabad, or Ghaziabad — we build local SEO around that area specifically, rather than generic city-wide targeting.';
  const meta = pageMeta({ title: 'SEO Services in Delhi NCR | Business Doctor', description: intro, path: '/services/seo' });
  const serviceSchema = { '@context': 'https://schema.org', '@type': 'Service', name: 'SEO Services', provider: { '@type': 'LocalBusiness', name: 'Business Doctor' }, areaServed: 'Delhi NCR', description: intro };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <meta property="og:title" content={meta.title} /><meta property="og:description" content={meta.description} /><meta property="og:image" content={meta.image} /><meta property="og:type" content="website" /><meta property="og:url" content={meta.canonical} />
        <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={meta.title} /><meta name="twitter:description" content={meta.description} /><meta name="twitter:image" content={meta.image} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(seoFaqItems)) }} />
      </Head>
      <Header />
      <ServiceHero title="SEO Services" intro={intro} />
      <ServiceFeatures />
      <ServiceProcess />
      <PricingTable filtered />
      <FAQ items={seoFaqItems} />
      <ServiceCTA />
      <Footer />
    </>
  );
}

export function getStaticProps() {
  return { props: {} };
}