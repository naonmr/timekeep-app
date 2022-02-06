const { PrismaClient } = require("@prisma/client");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const {
  postNewUser,
  getMeetings,
  postMeeting,
  deleteMeeting,
  putMeeting,
  getAgendas,
} = require("./controller");

const prisma = new PrismaClient();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("/api/meetings/:uid", getMeetings);
app.get("/api/agendas/:uid", getAgendas);

app.post("/api/users/:uid", postNewUser);
app.post("/api/meetings/:uid", postMeeting);

app.put("/api/meetings/:uid", putMeeting);

app.delete("/api/meetings/:uid", deleteMeeting);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
