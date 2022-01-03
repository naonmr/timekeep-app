import express from "express";
import morgan from "morgan";

export const setupServer = () => {
  const app = express();
  app.use(morgan("dev"));
  app.use(express.json());

  return app;
};
