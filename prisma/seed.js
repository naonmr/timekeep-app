const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    email: "test_xxx@test.com",
    name: "test",
    meetings: {
      create: {
        title: "example",
        agendas: {
          create: {
            title: "agenda1",
            time: 1,
          },
          create: {
            title: "agenda2",
            time: 2,
          },
        },
      },
    },
  },
  {
    email: "test_xxx2@test.com",
    name: "test2",
    meetings: {
      create: {
        title: "example2",
        agendas: {
          create: {
            title: "agenda1",
            time: 1,
          },
          create: {
            title: "agenda2",
            time: 2,
          },
        },
      },
    },
  },
];
console.log(`Start seeding ...`);
async function seed() {
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
    console.log(`Seeding finished.`);
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
