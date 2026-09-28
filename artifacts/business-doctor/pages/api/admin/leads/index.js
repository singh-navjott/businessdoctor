import { db, leads } from '@workspace/db';
import { verifyAuth } from '../../../../lib/auth';
import { desc } from 'drizzle-orm';

export default async function handler(req, res) {
  const isAuth = await verifyAuth(req);
  if (!isAuth) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    try {
      const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));
      return res.status(200).json(allLeads);
    } catch (err) {
      return res.status(500).json({ message: 'Error fetching leads' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
