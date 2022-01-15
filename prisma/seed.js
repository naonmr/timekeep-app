const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData = [
  {
    uid: "d0n4OWQHCfVVmHPApeNUZ1yU3672",
    name: "test",
    meetings: {
      create: {
        title: "test",
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
        title: "test2",
        agendas: {
          create: {
            title: "agenda2-1",
            time: 1,
          },
          create: {
            title: "agenda2-2",
            time: 2,
          },
        },
      },
    },
  },
  {
    uid: "61Q9QHo01HNJ66IP0MCOHSbIvd43",
    name: "testdesu",
    meetings: {
      create: {
        title: "testedsu1",
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
        title: "testedsu2",
        agendas: {
          create: {
            title: "agenda2-1",
            time: 1,
          },
          create: {
            title: "agenda2-1",
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
