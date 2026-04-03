import postgres from 'postgres';
import fs from 'fs';

const sql = postgres('postgresql://neondb_owner:npg_Ry8Ry8Ry8@ep-quiet-mode-aiw1p876-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require');

async function backup() {
  const tables = await sql`
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public'
  `;
  
  let output = `-- Animaker.AI Database Backup\n-- Date: ${new Date().toISOString()}\n\n`;
  
  for (const {tablename} of tables) {
    const rows = await sql`SELECT * FROM ${sql(tablename)}`;
    output += `\n-- Table: ${tablename} (${rows.length} rows)\n`;
    if (rows.length > 0) {
      output += `-- Sample: ${JSON.stringify(rows[0]).substring(0, 200)}...\n`;
    }
  }
  
  fs.writeFileSync('/home/node/clawd/canvas/animaker-db-backup-2026-02-18.txt', output);
  console.log('✅ Backup completed:', tables.length, 'tables');
  await sql.end();
}

backup().catch(console.error);
