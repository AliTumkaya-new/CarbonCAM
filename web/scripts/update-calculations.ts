import { sql } from "@vercel/postgres";

async function updateCalculationsTable() {
  console.log("🔄 Updating calculations table...\n");

  try {
    // Drop existing table
    console.log("Dropping existing calculations table...");
    await sql`DROP TABLE IF EXISTS calculations`;

    // Create new table with correct columns
    console.log("Creating new calculations table...");
    await sql`
      CREATE TABLE calculations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
        machine_name TEXT NOT NULL,
        material_name TEXT NOT NULL,
        initial_weight_kg DOUBLE PRECISION NOT NULL,
        final_weight_kg DOUBLE PRECISION NOT NULL,
        process_time_minutes DOUBLE PRECISION NOT NULL,
        total_energy_kwh DOUBLE PRECISION NOT NULL,
        total_carbon_kg DOUBLE PRECISION NOT NULL,
        carbon_intensity DOUBLE PRECISION NOT NULL DEFAULT 0.44,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // Create indexes
    console.log("Creating indexes...");
    await sql`CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON calculations(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_calculations_company_id ON calculations(company_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations(created_at)`;

    console.log("\n✅ Calculations table updated successfully!");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

updateCalculationsTable();
