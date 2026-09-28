import Head from 'next/head';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { db, blogs } from '@workspace/db';
import { eq } from 'drizzle-orm';
import SafeImage from '../../components/shared/SafeImage';

export default function BlogDetail({ blog }) {
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.seoTitle || `${blog.title} | Business Doctor`}</title>
        <meta name="description" content={blog.seoDescription || blog.excerpt} />
        {blog.ogImage && <meta property="og:image" content={blog.ogImage} />}
      </Head>
      <Header />
      
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="flex items-center justify-center gap-4 text-sm mb-6">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600 font-medium">{blog.category}</span>
              <span className="text-gray-500">{new Date(blog.publishedDate).toLocaleDateString()}</span>
            </div>
            <h1 className="display text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">{blog.title}</h1>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                {(blog.author || 'B')[0].toUpperCase()}
              </div>
              <div className="text-sm font-medium text-gray-900">{blog.author || 'Business Doctor Team'}</div>
            </div>
          </div>
          <div className="relative w-full aspect-video mb-16 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
            <SafeImage src={blog.featuredImage} alt={blog.title} fill className="object-cover" />
          </div>
          
          <div className="prose prose-lg prose-blue mx-auto max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const list = await db.select().from(blogs).where(eq(blogs.slug, params.slug));
    const blog = list[0];
    if (!blog || !blog.published) {
      return { notFound: true };
    }
    return { props: { blog: JSON.parse(JSON.stringify(blog)) } };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
}
