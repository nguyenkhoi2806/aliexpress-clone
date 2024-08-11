import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const response = await prisma.addresses.findMany({
    where: { userId: Number(event.context.params.id) },
  });
  return response;
});
