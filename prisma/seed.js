const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData1 = {
  data: {
    uid: "d0n4OWQHCfVVmHPApeNUZ1yU3672",
    name: "test",
    meetings: {
      create: [
        {
          title: "test1",
          agendas: {
            create: [
              { order: 1, title: "agenda1", time: 1 },
              { order: 2, title: "agenda2", time: 2 },
            ],
          },
        },
        {
          title: "test2",
          agendas: {
            create: [
              { order: 1, title: "agenda2-1", time: 1 },
              { order: 2, title: "agenda2-2", time: 2 },
            ],
          },
        },
      ],
    },
  },
};

const userData2 = {
  uid: "61Q9QHo01HNJ66IP0MCOHSbIvd43",
  name: "testdesu",
  meetings: {
    create: [
      {
        title: "testdesu1",
        agendas: {
          create: [
            { order: 1, title: "agendadesu1", time: 1 },
            { order: 2, title: "agendadesu2", time: 2 },
          ],
        },
      },
      {
        title: "testdesu2",
        agendas: {
          create: [
            { order: 1, title: "agendadesu2-1", time: 1 },
            { order: 2, title: "agendadesu2-1", time: 2 },
          ],
        },
      },
    ],
  },
};

async function seed() {
  const user1 = await prisma.user.create(userData1);
  // const user2 = await prisma.user.create(userData2);
  console.log(`Created user with id: ${user1.id}`);
  // console.log(`Created user with id: ${user2.id}`);
  console.log(`Seeding finished.`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
