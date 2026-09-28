import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { sql } from 'drizzle-orm';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error('DATABASE_URL is missing!');
  process.exit(1);
}

const { Pool } = pg;
const pool = new Pool({ connectionString: dbUrl });
const db = drizzle(pool);

async function testConnection() {
  try {
    const res = await db.execute(sql`SELECT 1`);
    if (res.rows.length > 0) {
      console.log('PostgreSQL connection: SUCCESS');
    }
    
    // Check tables
    const tableQuery = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    const tables = tableQuery.rows.map((row: any) => row.table_name);
    console.log('TABLES_FOUND:', JSON.stringify(tables));
    
  } catch (err: any) {
    console.error('Connection failed:', err.message);
  } finally {
    await pool.end();
  }
}

testConnection();
