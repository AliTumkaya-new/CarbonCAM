import { sql } from "@vercel/postgres";

async function initDatabase() {
  console.log("🚀 Initializing CarbonCAM database...\n");

  try {
    // Create pgcrypto extension for gen_random_uuid()
    console.log("Creating pgcrypto extension...");
    await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto"`;

    // Create set_updated_at function
    console.log("Creating set_updated_at function...");
    await sql`
      CREATE OR REPLACE FUNCTION set_updated_at()
      RETURNS TRIGGER
      LANGUAGE plpgsql
      AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$
    `;

    // 1. Materials table
    console.log("Creating materials table...");
    await sql`
      CREATE TABLE IF NOT EXISTS materials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL UNIQUE,
        kc_value DOUBLE PRECISION NOT NULL CHECK (kc_value > 0),
        density DOUBLE PRECISION NOT NULL CHECK (density > 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // Insert default materials
    console.log("Inserting default materials...");
    await sql`
      INSERT INTO materials (name, kc_value, density)
      VALUES
        ('Steel 4140', 2400, 7850),
        ('Aluminum 6061', 900, 2700),
        ('Stainless 304', 2800, 8000),
        ('Titanium Ti-6Al-4V', 1400, 4430),
        ('Brass C360', 1200, 8500)
      ON CONFLICT (name) DO UPDATE
      SET kc_value = EXCLUDED.kc_value,
          density = EXCLUDED.density
    `;

    // 2. Machines table
    console.log("Creating machines table...");
    await sql`
      CREATE TABLE IF NOT EXISTS machines (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        model TEXT NOT NULL UNIQUE,
        standby_power_kw DOUBLE PRECISION NOT NULL CHECK (standby_power_kw >= 0),
        max_power_kw DOUBLE PRECISION NOT NULL DEFAULT 0 CHECK (max_power_kw >= 0),
        carbon_intensity DOUBLE PRECISION NOT NULL DEFAULT 0.44 CHECK (carbon_intensity > 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // Insert default machines
    console.log("Inserting default machines...");
    await sql`
      INSERT INTO machines (model, standby_power_kw, max_power_kw)
      VALUES
        ('Mazak CNC', 1.5, 15),
        ('Doosan CNC', 2.0, 20),
        ('DMG Mori', 2.5, 25),
        ('Haas Lathe', 1.2, 12),
        ('Hurco Mill', 1.8, 18)
      ON CONFLICT (model) DO UPDATE
      SET standby_power_kw = EXCLUDED.standby_power_kw,
          max_power_kw = EXCLUDED.max_power_kw
    `;

    // 3. Companies table
    console.log("Creating companies table...");
    await sql`
      CREATE TABLE IF NOT EXISTS companies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        created_by TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    // 4. Company members table
    console.log("Creating company_members table...");
    await sql`
      CREATE TABLE IF NOT EXISTS company_members (
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        user_id TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'owner',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (company_id, user_id)
      )
    `;

    // 5. Custom machines table
    console.log("Creating custom_machines table...");
    await sql`
      CREATE TABLE IF NOT EXISTS custom_machines (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        brand TEXT,
        standby_power_kw DOUBLE PRECISION NOT NULL CHECK (standby_power_kw >= 0),
        max_power_kw DOUBLE PRECISION NOT NULL DEFAULT 0 CHECK (max_power_kw >= 0),
        efficiency_percent DOUBLE PRECISION NOT NULL DEFAULT 85 CHECK (efficiency_percent > 0 AND efficiency_percent <= 100),
        carbon_intensity DOUBLE PRECISION NOT NULL DEFAULT 0.44 CHECK (carbon_intensity > 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT custom_machines_unique_name_per_company UNIQUE (company_id, name)
      )
    `;

    // 6. Custom materials table
    console.log("Creating custom_materials table...");
    await sql`
      CREATE TABLE IF NOT EXISTS custom_materials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        kc_value DOUBLE PRECISION NOT NULL CHECK (kc_value > 0),
        density DOUBLE PRECISION NOT NULL CHECK (density > 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT custom_materials_unique_name_per_company UNIQUE (company_id, name)
      )
    `;

    // 7. Calculations table
    console.log("Creating calculations table...");
    await sql`
      CREATE TABLE IF NOT EXISTS calculations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT NOT NULL,
        company_id UUID REFERENCES companies(id) ON DELETE SET NULL,
        machine_id UUID REFERENCES machines(id) ON DELETE SET NULL,
        material_id UUID REFERENCES materials(id) ON DELETE SET NULL,
        initial_weight DOUBLE PRECISION NOT NULL CHECK (initial_weight >= 0),
        final_weight DOUBLE PRECISION NOT NULL CHECK (final_weight >= 0),
        process_time DOUBLE PRECISION NOT NULL CHECK (process_time > 0),
        total_energy_kwh DOUBLE PRECISION NOT NULL CHECK (total_energy_kwh >= 0),
        carbon_footprint_kg DOUBLE PRECISION NOT NULL CHECK (carbon_footprint_kg >= 0),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT calculations_weight_check CHECK (final_weight <= initial_weight)
      )
    `;

    // Create indexes
    console.log("Creating indexes...");
    await sql`CREATE INDEX IF NOT EXISTS idx_company_members_user_id ON company_members(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_custom_machines_company_id ON custom_machines(company_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_custom_materials_company_id ON custom_materials(company_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_calculations_user_id ON calculations(user_id)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_calculations_created_at ON calculations(created_at)`;

    console.log("\n✅ Database initialized successfully!");

    // Verify tables
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `;
    console.log("\n📋 Created tables:");
    tables.rows.forEach((row) => console.log(`   - ${row.table_name}`));
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

initDatabase();
