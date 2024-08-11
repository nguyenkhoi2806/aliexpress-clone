import { PrismaClient } from '@primsa/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const products = await prisma.products.findMany();
  return products;
});
