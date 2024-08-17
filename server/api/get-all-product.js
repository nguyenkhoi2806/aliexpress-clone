import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const products = await prisma.products.findMany({
    take: 24
  })
  return products;
});
