const { Prisma, PrismaClient } = require("@prisma/client");
const express = require("express");
const { request } = require("http");
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

app.get("/api/meetings/:uid", async (req, res) => {
  const uid = req.params.uid;
  const meetings = await prisma.meeting.findMany({
    where: {
      authorId: uid,
    },
  });
  res.json(meetings);
});

app.post("/api/meetings/:uid", async (req, res) => {
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

app.put("/api/meetings/:uid", async (req, res) => {
  const meetingId = Number(req.query.meetingId);
  const data = req.body;
  const putMeeting = await prisma.meeting.update({
    where: {
      id: meetingId,
    },
    data: { title: data.title },
  });
  const deleteAgenda = await prisma.agenda.deleteMany({
    where: {
      meetingId: meetingId,
    },
  });
  const createAgenda = await prisma.agenda.createMany({ data: data.agendas });
});

app.get("/api/agendas/:uid", async (req, res) => {
  const meetingId = Number(req.query.meetingId);

  if (!NaN) {
    const meetingInfo = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
    });

    const agendaInfo = await prisma.agenda.findMany({
      where: {
        meetingId: meetingId,
      },
    });
    const resData = { title: meetingInfo.title, agendas: agendaInfo };

    res.json(resData);
  }
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
