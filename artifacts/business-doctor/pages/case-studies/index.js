import Head from 'next/head';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Link from 'next/link';
import { db, caseStudies } from '@workspace/db';
import { eq, desc } from 'drizzle-orm';
import { ArrowRight } from 'lucide-react';
import SafeImage from '../../components/shared/SafeImage';

export default function CaseStudiesPage({ caseStudiesList }) {
  return (
    <>
      <Head>
        <title>Case Studies | Business Doctor</title>
        <meta name="description" content="Read our success stories and discover how we've helped businesses achieve growth with digital marketing." />
      </Head>
      <Header />
      
      <div className="bg-neutral-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="display text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">Our Case Studies</h1>
            <p className="mt-4 text-lg text-gray-600">Discover how we deliver real results for our clients.</p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {caseStudiesList.map((cs) => (
              <article key={cs.id} className="flex flex-col items-start justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
                  <SafeImage src={cs.featuredImage} alt={cs.title} fill className="object-cover" />
                </div>
                <div className="mt-6 flex items-center gap-x-4 text-xs">
                  <time dateTime={cs.publishedDate} className="text-gray-500">
                    {new Date(cs.publishedDate).toLocaleDateString()}
                  </time>
                  <span className="relative z-10 rounded-full bg-orange-50 px-3 py-1.5 font-medium text-orange-600">
                    {cs.industry || 'Digital Marketing'}
                  </span>
                </div>
                <div className="group relative mt-4">
                  <h3 className="text-xl font-bold leading-6 text-gray-900 group-hover:text-primary line-clamp-2">
                    <Link href={`/case-studies/${cs.slug}`}>
                      <span className="absolute inset-0" />
                      {cs.title}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                    {cs.shortDescription}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between w-full">
                  <span className="text-sm font-semibold text-gray-900">{cs.clientName}</span>
                  <Link href={`/case-studies/${cs.slug}`} className="flex items-center gap-1 text-sm font-semibold text-primary z-10">
                    View Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const list = await db.select().from(caseStudies).where(eq(caseStudies.published, true)).orderBy(desc(caseStudies.publishedDate));
    return { props: { caseStudiesList: JSON.parse(JSON.stringify(list)) } };
  } catch (err) {
    console.error(err);
    return { props: { caseStudiesList: [] } };
  }
}
