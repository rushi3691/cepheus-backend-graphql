import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export type DBContext = {
  prisma: PrismaClient;
  id?: number;
  ini?: string;
  registered?: boolean;
}

// export const context: DBContext = {
//   prisma: prisma,
// };

