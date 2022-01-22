const { Prisma, PrismaClient } = require("@prisma/client");
const { create } = require("domain");
const express = require("express");
// const { request } = require("http");
const morgan = require("morgan");
const path = require("path");
const { title } = require("process");

const prisma = new PrismaClient();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "..", "build")));

app.post("/api/user/:uid", async (req, res) => {
  const data = req.body;
  console.log(data);
  const newUser = await prisma.user.create({ data: data });
  res.json(newUser);
});

app.get("/api/meetings/:uid", async (req, res) => {
  const uid = req.params.uid;
  const meetings = await prisma.meeting.findMany({
    where: {
      authorId: uid,
    },
  });
  console.log("🙇‍♀️", meetings);
  res.json(meetings);
});

app.post("/api/meetings/:uid", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newMeeting = await prisma.meeting.create({ data: data });
    res.json(newMeeting);
  } catch (error) {
    console.log(error);
  }
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
  console.log("😭", data);
  const deleteAgenda = await prisma.agenda.deleteMany({
    where: {
      meetingId: meetingId,
    },
  });

  const putMeeting = await prisma.meeting.update({
    where: {
      id: meetingId,
    },
    data: { title: data.title },
  });

  data.agendas.map(async (agenda) => {
    const createNewAgenda = await prisma.agenda.create({
      data: {
        title: agenda.title,
        time: agenda.time,
        meeting: {
          connect: {
            id: meetingId,
          },
        },
      },
    });
    console.log(createNewAgenda);
  });

  res.json(putMeeting);
});

app.get("/api/agendas/:uid", async (req, res) => {
  const meetingId = Number(req.query.meetingId);

  if (meetingId) {
    const meetingInfo = await prisma.meeting.findUnique({
      where: {
        id: meetingId,
      },
    });

    let agendas = await prisma.agenda.findMany({
      where: {
        meetingId: meetingId,
      },
    });

    //　getした情報を並び替える
    for (let i = 0; i < agendas.length; i++) {
      for (let j = agendas.length; i < j; j++) {
        if (agendas[i].order < agendas[j - 1].order) {
          let tmp = agendas[j - 1];
          agendas[j - 1] = agendas[j];
          agendas[j] = tmp;
        }
      }
    }
    const resData = { title: meetingInfo.title, agendas: agendas };
    console.log(resData);
    res.json(resData);
  }
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
