import { db } from '../src/index';
import { blogs, caseStudies } from '../src/schema';
import { eq } from 'drizzle-orm';
import postgres from 'pg';

async function seed() {
  console.log("Checking for existing blog data...");
  const existingBlogs = await db.select().from(blogs);
  
  if (existingBlogs.length === 0) {
    console.log("No blogs found. Inserting demo blogs...");
    const demoBlogs = [
      {
        title: 'Digital Marketing Strategies for Small Businesses in Delhi NCR',
        slug: 'digital-marketing-strategies-small-businesses-delhi-ncr',
        category: 'Digital Marketing',
        tags: 'Strategy, Local SEO',
        excerpt: 'Discover the top digital marketing strategies that can help your small business thrive in the competitive Delhi NCR market.',
        content: '<p>The digital landscape in Delhi NCR is booming. For small businesses, leveraging digital marketing is no longer optional—it is essential.</p><h2>1. Local SEO</h2><p>Optimize your Google My Business profile and target local keywords.</p><h2>2. Social Media</h2><p>Engage with your audience on Instagram and Facebook to build community.</p><h2>3. Paid Ads</h2><p>Run targeted local ads to drive immediate traffic and conversions.</p>',
        author: 'Business Doctor',
        seoTitle: 'Digital Marketing Strategies for Small Businesses in Delhi NCR',
        seoDescription: 'Discover the top digital marketing strategies for small businesses in Delhi NCR.',
        published: true,
        publishedDate: new Date(),
        featuredImage: 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80'
      },
      {
        title: 'How Local SEO Helps Businesses Get More Customers',
        slug: 'how-local-seo-helps-businesses-get-more-customers',
        category: 'SEO',
        tags: 'Local SEO, Growth',
        excerpt: 'Learn why Local SEO is the most cost-effective way to drive foot traffic and high-quality leads to your store.',
        content: '<p>When potential customers search for services near them, your business needs to appear at the top. Here is how local SEO achieves that.</p><h2>Google My Business</h2><p>A fully optimized GMB listing is your most powerful tool.</p><h2>Local Citations</h2><p>Ensure your NAP (Name, Address, Phone) is consistent across directories.</p>',
        author: 'Business Doctor',
        seoTitle: 'How Local SEO Helps Businesses Get More Customers',
        seoDescription: 'Learn why Local SEO is the most cost-effective way to drive foot traffic.',
        published: true,
        publishedDate: new Date(),
        featuredImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80'
      },
      {
        title: 'Google Ads vs Meta Ads for Local Businesses',
        slug: 'google-ads-vs-meta-ads-local-businesses',
        category: 'Paid Advertising',
        tags: 'Google Ads, Meta Ads',
        excerpt: 'Confused between Google Ads and Meta Ads? Find out which platform yields the best ROI for local businesses.',
        content: '<p>Choosing between search intent (Google) and audience targeting (Meta) depends on your business goals.</p><h2>Google Ads</h2><p>Best for high-intent searches. If someone is searching for "plumber near me", you want to be there.</p><h2>Meta Ads</h2><p>Best for visual products and brand awareness. Great for restaurants and apparel.</p>',
        author: 'Business Doctor',
        seoTitle: 'Google Ads vs Meta Ads for Local Businesses',
        seoDescription: 'Find out which platform yields the best ROI for local businesses.',
        published: true,
        publishedDate: new Date(),
        featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80'
      },
      {
        title: 'How Social Media Marketing Builds Brand Visibility',
        slug: 'how-social-media-marketing-builds-brand-visibility',
        category: 'Social Media',
        tags: 'Branding, Social Media',
        excerpt: 'Social media is more than just posting pictures. It is about building a community and establishing authority.',
        content: '<p>A strong social media presence builds trust and keeps your brand top-of-mind.</p><h2>Consistency is Key</h2><p>Post regularly and maintain a consistent brand voice.</p><h2>Engage with Followers</h2><p>Respond to comments and messages promptly to build loyalty.</p>',
        author: 'Business Doctor',
        seoTitle: 'How Social Media Marketing Builds Brand Visibility',
        seoDescription: 'Social media is about building a community and establishing authority.',
        published: true,
        publishedDate: new Date(),
        featuredImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80'
      },
      {
        title: 'Website Development Mistakes Small Businesses Should Avoid',
        slug: 'website-development-mistakes-small-businesses-avoid',
        category: 'Web Development',
        tags: 'Website, UX/UI',
        excerpt: 'Your website is your digital storefront. Avoid these common development mistakes that hurt conversions.',
        content: '<p>A poorly designed website can cost you customers. Here is what to avoid.</p><h2>1. Slow Loading Speeds</h2><p>Optimize images and use modern frameworks to keep your site fast.</p><h2>2. Not Mobile Friendly</h2><p>Over 60% of traffic is mobile. Ensure your site is fully responsive.</p><h2>3. Weak CTAs</h2><p>Tell your visitors exactly what to do next with clear Call-to-Actions.</p>',
        author: 'Business Doctor',
        seoTitle: 'Website Development Mistakes Small Businesses Should Avoid',
        seoDescription: 'Avoid these common website development mistakes that hurt conversions.',
        published: true,
        publishedDate: new Date(),
        featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80'
      }
    ];
    await db.insert(blogs).values(demoBlogs);
    console.log("Inserted 5 demo blogs.");
  } else {
    console.log(`Found ${existingBlogs.length} existing blogs. Skipping blog seed.`);
  }

  console.log("Checking for existing case studies data...");
  const existingCS = await db.select().from(caseStudies);
  
  if (existingCS.length === 0) {
    console.log("No case studies found. Inserting demo case studies...");
    const demoCS = [
      {
        title: 'Local SEO Growth Campaign — Delhi NCR Restaurant',
        slug: 'local-seo-growth-delhi-ncr-restaurant',
        clientName: 'Spice & Grill',
        industry: 'Hospitality',
        category: 'SEO',
        featuredImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
        shortDescription: 'How we increased local reservations by 150% in 3 months using targeted local SEO.',
        projectOverview: '<p>Spice & Grill is a premium restaurant in Delhi NCR that was struggling with local visibility despite excellent food and service.</p>',
        challenge: '<p>The restaurant was not ranking in the Local Pack for key terms like "best restaurants near me" or "fine dining in Delhi".</p>',
        strategy: '<p>We implemented a comprehensive Local SEO strategy focusing on GMB optimization, local citations, and reviewing generation.</p>',
        solution: '<p>Optimized their Google My Business profile, standardized NAP across 50+ local directories, and implemented a seamless review collection process.</p>',
        implementation: '<p>The campaign was rolled out over 3 months, with weekly monitoring and ongoing content updates to GMB.</p>',
        results: '<p>The restaurant saw a massive spike in direct calls and online reservations directly attributed to Google searches.</p>',
        keyMetrics: '150% increase in reservations, 300% increase in map views.',
        technologies: 'Local SEO, GMB Management',
        seoTitle: 'Local SEO Growth Campaign — Delhi NCR Restaurant',
        seoDescription: 'How we increased local reservations by 150% in 3 months using targeted local SEO.',
        published: true,
        publishedDate: new Date()
      },
      {
        title: 'Performance Marketing Campaign — D2C Brand',
        slug: 'performance-marketing-campaign-d2c-brand',
        clientName: 'EcoWear India',
        industry: 'E-commerce',
        category: 'Paid Advertising',
        featuredImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80',
        shortDescription: 'Scaling a sustainable fashion brand to 5X ROAS using Meta and Google Ads.',
        projectOverview: '<p>EcoWear is a sustainable D2C fashion brand looking to scale their online sales profitably.</p>',
        challenge: '<p>High Customer Acquisition Cost (CAC) on Meta ads was eating into their profit margins.</p>',
        strategy: '<p>We restructured their ad accounts, implemented advanced audience segmentation, and launched dynamic retargeting.</p>',
        solution: '<p>Deployed a full-funnel strategy. Top of funnel focused on brand story via video ads, while middle and bottom focused on product carousels and dynamic catalog sales.</p>',
        implementation: '<p>A/B tested 20+ ad creatives and optimized budget allocation daily.</p>',
        results: '<p>Reduced CAC by 40% and achieved a sustained Return on Ad Spend (ROAS) of 5X.</p>',
        keyMetrics: '5X ROAS, 40% reduction in CAC, 200% increase in monthly revenue.',
        technologies: 'Meta Ads, Google Ads, Conversion Tracking',
        seoTitle: 'Performance Marketing Campaign — D2C Brand',
        seoDescription: 'Scaling a sustainable fashion brand to 5X ROAS using Meta and Google Ads.',
        published: true,
        publishedDate: new Date()
      },
      {
        title: 'Website Redesign & SEO — Local Service Business',
        slug: 'website-redesign-seo-local-service',
        clientName: 'Apex Plumbing',
        industry: 'Home Services',
        category: 'Web Development & SEO',
        featuredImage: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80',
        shortDescription: 'Revamping an outdated website and implementing an SEO strategy that tripled organic leads.',
        projectOverview: '<p>Apex Plumbing had an old, non-mobile friendly website and relied entirely on word-of-mouth.</p>',
        challenge: '<p>The website was virtually invisible on search engines, and the high bounce rate suggested poor user experience on mobile devices.</p>',
        strategy: '<p>A complete website overhaul focusing on mobile-first design, combined with a robust on-page SEO strategy.</p>',
        solution: '<p>Designed a modern, fast-loading Next.js website with clear service pages and localized landing pages.</p>',
        implementation: '<p>Developed the site in 4 weeks, implemented 301 redirects, and launched local SEO content.</p>',
        results: '<p>Organic traffic skyrocketed, and the new site converted visitors at a much higher rate.</p>',
        keyMetrics: '300% increase in organic leads, 60% reduction in bounce rate, Page speed score of 95+.',
        technologies: 'Next.js, Tailwind CSS, On-page SEO',
        seoTitle: 'Website Redesign & SEO — Local Service Business',
        seoDescription: 'Revamping an outdated website and implementing an SEO strategy that tripled organic leads.',
        published: true,
        publishedDate: new Date()
      },
      {
        title: 'Social Media Growth Campaign — Startup Brand',
        slug: 'social-media-growth-startup-brand',
        clientName: 'TechNova Solutions',
        industry: 'Technology',
        category: 'Social Media',
        featuredImage: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80',
        shortDescription: 'Building brand authority and increasing LinkedIn engagement by 500% for a B2B SaaS startup.',
        projectOverview: '<p>TechNova needed to establish thought leadership and generate B2B leads through LinkedIn.</p>',
        challenge: '<p>Their existing social presence was sporadic and lacked a cohesive brand narrative.</p>',
        strategy: '<p>Develop a content calendar focused on educational industry insights, company culture, and product use cases.</p>',
        solution: '<p>Created high-quality carousel posts, thought-leadership articles, and engaging video snippets.</p>',
        implementation: '<p>Managed their LinkedIn and Twitter profiles, posting consistently 4 times a week and engaging with industry influencers.</p>',
        results: '<p>Significant growth in brand visibility, follower count, and inbound inquiries from potential B2B clients.</p>',
        keyMetrics: '500% increase in LinkedIn engagement, 2000+ new targeted followers, 50+ inbound leads.',
        technologies: 'Content Strategy, Social Media Management',
        seoTitle: 'Social Media Growth Campaign — Startup Brand',
        seoDescription: 'Building brand authority and increasing LinkedIn engagement by 500% for a B2B SaaS startup.',
        published: true,
        publishedDate: new Date()
      }
    ];
    await db.insert(caseStudies).values(demoCS);
    console.log("Inserted 4 demo case studies.");
  } else {
    console.log(`Found ${existingCS.length} existing case studies. Skipping case study seed.`);
  }

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
