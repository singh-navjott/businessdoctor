import { db, blogs } from '@workspace/db';
import { verifyAuth } from '../../../../lib/auth';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  const isAuth = await verifyAuth(req);
  if (!isAuth) return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, slug, featuredImage, category, tags, excerpt, content, author, seoTitle, seoDescription, ogImage, published } = req.body;
      const updatedBlog = await db.update(blogs).set({
        title, slug, featuredImage, category, tags, excerpt, content, author, seoTitle, seoDescription, ogImage, published,
        publishedDate: published ? new Date() : null,
        updatedAt: new Date()
      }).where(eq(blogs.id, Number(id))).returning();
      return res.status(200).json(updatedBlog[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating blog' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await db.delete(blogs).where(eq(blogs.id, Number(id)));
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ message: 'Error deleting blog' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
