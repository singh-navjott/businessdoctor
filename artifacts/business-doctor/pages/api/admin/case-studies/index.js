import { db, caseStudies } from '@workspace/db';
import { verifyAuth } from '../../../../lib/auth';
import { desc } from 'drizzle-orm';

export default async function handler(req, res) {
  const isAuth = await verifyAuth(req);
  if (!isAuth) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const allCS = await db.select().from(caseStudies).orderBy(desc(caseStudies.createdAt));
      return res.status(200).json(allCS);
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching case studies' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, slug, clientName, industry, category, featuredImage, shortDescription, projectOverview, challenge, strategy, solution, implementation, results, keyMetrics, technologies, imageGallery, seoTitle, seoDescription, ogImage, published } = req.body;
      const newCS = await db.insert(caseStudies).values({
        title, slug, clientName, industry, category, featuredImage, shortDescription, projectOverview, challenge, strategy, solution, implementation, results, keyMetrics, technologies, imageGallery, seoTitle, seoDescription, ogImage, published,
        publishedDate: published ? new Date() : null
      }).returning();
      return res.status(201).json(newCS[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating case study' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
