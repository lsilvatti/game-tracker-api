import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// needs a prisma client adapter to work, generate with npm run db:setup or db:generate
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };