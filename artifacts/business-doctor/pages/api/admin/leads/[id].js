import { db, leads } from '@workspace/db';
import { verifyAuth } from '../../../../lib/auth';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  const isAuth = await verifyAuth(req);
  if (!isAuth) return res.status(401).json({ message: 'Unauthorized' });

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { status, internalNotes } = req.body;
      const updatedLead = await db.update(leads).set({
        status, internalNotes,
        updatedAt: new Date()
      }).where(eq(leads.id, Number(id))).returning();
      return res.status(200).json(updatedLead[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating lead' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await db.delete(leads).where(eq(leads.id, Number(id)));
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ message: 'Error deleting lead' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
