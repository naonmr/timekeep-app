const { Prisma, PrismaClient } = require("@prisma/client");
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const prisma = new PrismaClient();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/users", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
  res.json(allUsers);
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
