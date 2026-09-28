import { jwtVerify } from 'jose';

export async function verifyAuth(req) {
  const token = req.cookies['admin-token'];
  if (!token) return false;
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-for-dev');
    await jwtVerify(token, secret);
    return true;
  } catch (err) {
    return false;
  }
}
