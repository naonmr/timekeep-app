const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const userData1 = {
  uid: "d0n4OWQHCfVVmHPApeNUZ1yU3672",
  name: "test",
  meetings: {
    create: [
      {
        title: "test1",
        agendas: {
          create: [
            { title: "agenda1", time: 1 },
            { title: "agenda2", time: 2 },
          ],
        },
      },
      {
        title: "test2",
        agendas: {
          create: [
            { title: "agenda2-1", time: 1 },
            { title: "agenda2-1", time: 2 },
          ],
        },
      },
    ],
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
            { title: "agendadesu1", time: 1 },
            { title: "agendadesu2", time: 2 },
          ],
        },
      },
      {
        title: "testdesu2",
        agendas: {
          create: [
            { title: "agendadesu2-1", time: 1 },
            { title: "agendadesu2-1", time: 2 },
          ],
        },
      },
    ],
  },
};

async function seed() {
  const user1 = await prisma.user.create({
    data: userData1,
  });
  const user2 = await prisma.user.create({
    data: userData2,
  });
  console.log(`Created user with id: ${user1.id}`);
  console.log(`Created user with id: ${user2.id}`);
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
