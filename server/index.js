import express from "express";
import morgan from "morgan";

export const setupServer = () => {
  const app = express();
  app.use(morgan("dev"));
  app.use(express.json());

  return app;
};

setupServer();

async function main() {
  // ... you will write your Prisma Client queries here
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}
