import { db, admins } from '@workspace/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  try {
    const adminList = await db.select().from(admins).where(eq(admins.username, username));
    const admin = adminList[0];

    // For first time setup if no admins exist
    const allAdmins = await db.select().from(admins);
    if (allAdmins.length === 0 && username === 'admin') {
      const hash = await bcrypt.hash(password, 10);
      await db.insert(admins).values({ username, passwordHash: hash });
      // Authenticate
    } else {
      if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
      const isValid = await bcrypt.compare(password, admin.passwordHash);
      if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-for-dev');
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    res.setHeader('Set-Cookie', serialize('admin-token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    }));

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
