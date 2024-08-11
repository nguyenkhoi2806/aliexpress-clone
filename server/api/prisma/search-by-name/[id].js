import { PrismaClient } from '@primsa/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const items = await prisma.item.findMany({
    take: 5,
    where: {
      name: {
        contains: event.context.params.id,
        mode: 'insensitive',
      },
    },
  });

  return items;
});
