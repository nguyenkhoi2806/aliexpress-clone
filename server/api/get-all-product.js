import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parseInt(query.page) || 1;
  const pageSize = 24;

  const products = await prisma.products.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return products;
});
