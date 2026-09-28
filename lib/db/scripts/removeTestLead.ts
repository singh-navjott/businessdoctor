import { db } from '../src/index';
import { leads } from '../src/schema';
import { eq, and } from 'drizzle-orm';

async function removeTestLead() {
  try {
    const res = await db.delete(leads).where(
      and(
        eq(leads.name, 'Test Lead'),
        eq(leads.email, 'test@example.com')
      )
    ).returning();
    
    console.log(`Deleted ${res.length} test leads.`);
  } catch (err: any) {
    console.error(err.message);
  } finally {
    process.exit(0);
  }
}

removeTestLead();
