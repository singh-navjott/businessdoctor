import { db } from '../src/index';
import { admins, blogs, caseStudies, leads } from '../src/schema';
import { sql } from 'drizzle-orm';

async function count() {
  try {
    const adminCount = await db.select({ count: sql`count(*)` }).from(admins);
    const blogCount = await db.select({ count: sql`count(*)` }).from(blogs);
    const csCount = await db.select({ count: sql`count(*)` }).from(caseStudies);
    const leadCount = await db.select({ count: sql`count(*)` }).from(leads);
    
    console.log(`admins: ${adminCount[0].count}`);
    console.log(`blogs: ${blogCount[0].count}`);
    console.log(`case_studies: ${csCount[0].count}`);
    console.log(`leads: ${leadCount[0].count}`);
  } catch (err: any) {
    console.error(err.message);
  } finally {
    process.exit(0);
  }
}

count();
