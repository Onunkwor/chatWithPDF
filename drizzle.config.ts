import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
export default {
  driver: "pg",
  schema: "./src/lib/database/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

//npx drizzle-kit push:pg
//npx drizzle-kit studio
