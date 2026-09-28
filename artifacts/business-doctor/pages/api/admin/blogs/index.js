import { db, blogs } from '@workspace/db';
import { verifyAuth } from '../../../../lib/auth';
import { desc } from 'drizzle-orm';

export default async function handler(req, res) {
  const isAuth = await verifyAuth(req);
  if (!isAuth) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const allBlogs = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
      return res.status(200).json(allBlogs);
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching blogs' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, slug, featuredImage, category, tags, excerpt, content, author, seoTitle, seoDescription, ogImage, published } = req.body;
      const newBlog = await db.insert(blogs).values({
        title, slug, featuredImage, category, tags, excerpt, content, author, seoTitle, seoDescription, ogImage, published,
        publishedDate: published ? new Date() : null
      }).returning();
      return res.status(201).json(newBlog[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating blog' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
