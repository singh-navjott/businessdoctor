import { db, caseStudies } from '@workspace/db';
import { verifyAuth } from '../../../../lib/auth';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  const isAuth = await verifyAuth(req);
  if (!isAuth) return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, slug, clientName, industry, category, featuredImage, shortDescription, projectOverview, challenge, strategy, solution, implementation, results, keyMetrics, technologies, imageGallery, seoTitle, seoDescription, ogImage, published } = req.body;
      const updatedCS = await db.update(caseStudies).set({
        title, slug, clientName, industry, category, featuredImage, shortDescription, projectOverview, challenge, strategy, solution, implementation, results, keyMetrics, technologies, imageGallery, seoTitle, seoDescription, ogImage, published,
        publishedDate: published ? new Date() : null,
        updatedAt: new Date()
      }).where(eq(caseStudies.id, Number(id))).returning();
      return res.status(200).json(updatedCS[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating case study' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await db.delete(caseStudies).where(eq(caseStudies.id, Number(id)));
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ message: 'Error deleting case study' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
