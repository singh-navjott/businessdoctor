import Head from 'next/head';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { db, caseStudies } from '@workspace/db';
import { eq } from 'drizzle-orm';
import SafeImage from '../../components/shared/SafeImage';

export default function CaseStudyDetail({ cs }) {
  if (!cs) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Case Study Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{cs.seoTitle || `${cs.title} | Business Doctor`}</title>
        <meta name="description" content={cs.seoDescription || cs.shortDescription} />
        {cs.ogImage && <meta property="og:image" content={cs.ogImage} />}
      </Head>
      <Header />
      
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-10">
            <h1 className="display text-3xl font-extrabold tracking-tight text-primary sm:text-5xl">{cs.title}</h1>
            <p className="mt-4 text-xl text-gray-600">{cs.shortDescription}</p>
          </div>
          <div className="relative w-full aspect-video mb-16 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            <SafeImage src={cs.featuredImage} alt={cs.title} fill className="object-cover" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Client</h3>
              <p className="text-lg font-bold text-gray-900">{cs.clientName || 'Confidential'}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Industry</h3>
              <p className="text-lg font-bold text-gray-900">{cs.industry || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Services Used</h3>
              <p className="text-lg font-bold text-gray-900">{cs.technologies || 'Digital Marketing'}</p>
            </div>
          </div>

          <div className="prose prose-lg prose-blue mx-auto max-w-none">
            {cs.projectOverview && (
              <>
                <h2>Project Overview</h2>
                <div dangerouslySetInnerHTML={{ __html: cs.projectOverview }} />
              </>
            )}
            
            {cs.challenge && (
              <>
                <h2>The Challenge</h2>
                <div dangerouslySetInnerHTML={{ __html: cs.challenge }} />
              </>
            )}
            
            {cs.solution && (
              <>
                <h2>Our Solution</h2>
                <div dangerouslySetInnerHTML={{ __html: cs.solution }} />
              </>
            )}
            
            {cs.results && (
              <>
                <h2>Results</h2>
                <div dangerouslySetInnerHTML={{ __html: cs.results }} />
              </>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const list = await db.select().from(caseStudies).where(eq(caseStudies.slug, params.slug));
    const cs = list[0];
    if (!cs || !cs.published) {
      return { notFound: true };
    }
    return { props: { cs: JSON.parse(JSON.stringify(cs)) } };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
}
