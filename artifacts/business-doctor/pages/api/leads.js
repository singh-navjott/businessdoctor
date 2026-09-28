import { db, leads } from '@workspace/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, phone, email, company, service, message, source } = req.body;
      
      // Server-side validation
      if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Name is required' });
      }
      
      const isChatbot = !source || source.toLowerCase() === 'chatbot';
      
      if (!isChatbot) {
        if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return res.status(400).json({ message: 'Valid email is required' });
        }
      } else if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Valid email is required' });
      }

      if (!phone || typeof phone !== 'string' || phone.trim() === '') {
        return res.status(400).json({ message: 'Phone number is required' });
      }
      if (!message || typeof message !== 'string' || message.trim() === '') {
        return res.status(400).json({ message: 'Message is required' });
      }

      const newLead = await db.insert(leads).values({
        name, phone, email, company, service, message, source: source || 'Chatbot', status: 'New'
      }).returning();
      return res.status(201).json(newLead[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating lead' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
