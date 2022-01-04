const { Prisma, PrismaClient } = require("@prisma/client");
const express = require("express");
const morgan = require("morgan");

const prisma = new PrismaClient();

const app = express();
app.use(morgan("dev"));
app.use(express.json());

async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
