const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require('faker');

async function seedProducts() {
  try {
    const productsData = [];

    for (let i = 0; i < 500; i++) {
      productsData.push({
        title: faker.commerce.productName(),
        description: faker.lorem.paragraphs(2),
        url: `https://picsum.photos/id/${Math.floor(Math.random() * 200)}/800/800`,
        price: faker.commerce.price(100, 100000, 0),
      });
    }

    await prisma.products.createMany({
      data: productsData,
    });

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedProducts();
