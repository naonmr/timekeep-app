const { Prisma, PrismaClient } = require("@prisma/client");
const express = require("express");
const { request } = require("http");
const morgan = require("morgan");
const path = require("path");
const { json } = require("stream/consumers");

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

app.get("/api/meetings/:uid", async (req, res) => {
  // uuidで情報とってくる
  const uid = req.params.uid;
  const meetings = await prisma.meeting.findMany({
    where: {
      authorId: uid,
    },
  });
  res.json(meetings);
});

app.post("/api/meetings", async (req, res) => {
  const data = req.body;
  console.log(data);
  const newMeeting = await prisma.meeting.create({ data: data });
  res.json(data);
});

app.delete("/api/meetings/:uid", async (req, res) => {
  const meetingId = Number(req.query.meetingId);
  console.log("👧", meetingId);

  const deleteAgenda = await prisma.agenda.deleteMany({
    where: {
      meetingId: meetingId,
    },
  });
  const deleteMeeting = await prisma.meeting.delete({
    where: {
      id: meetingId,
    },
  });

  res.json(deleteAgenda);
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
