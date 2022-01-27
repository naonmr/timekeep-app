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
  // getした情報を並び替える;
  for (let outer = 0; outer < meetings.length - 1; outer++) {
    for (let i = meetings.length - 1; i > outer; i--) {
      if (meetings[i].id < meetings[i - 1].id) {
        let tmp = meetings[i];
        meetings[i] = meetings[i - 1];
        meetings[i - 1] = tmp;
      }
    }
  }
  console.log("🙇‍♀️", meetings);
  res.json(meetings);
});

app.post("/api/meetings/:uid", async (req, res) => {
  const data = req.body;
  const uid = req.params.uid;

  let count = 1;
  const agendas = data.agendas.map((agenda) => {
    agenda.order = count;
    count++;
    return agenda;
  });
  console.log(agendas);

  let newMeeting = {
    title: data.title,
    author: {
      connect: {
        uid: uid,
      },
    },
    agendas: {
      create: agendas,
    },
  };
  console.log(newMeeting);
  const createMeeting = await prisma.meeting.create({ data: newMeeting });
  res.json(newMeeting);
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

  let count = 1;
  const agendas = data.agendas.map((agenda) => {
    agenda.order = count;
    count++;
    return agenda;
  });

  console.log("😭", agendas);

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
        order: agenda.order,
        meeting: {
          connect: {
            id: meetingId,
          },
        },
      },
    });
    console.log("🐱", createNewAgenda);
  });

  res.json(putMeeting);
});

app.get("/api/agendas/:uid", async (req, res) => {
  const meetingId = Number(req.query.meetingId);

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

  console.log("🐵", agendas);
  // getした情報を並び替える;
  for (let outer = 0; outer < agendas.length - 1; outer++) {
    for (let i = agendas.length - 1; i > outer; i--) {
      if (agendas[i].order < agendas[i - 1].order) {
        let tmp = agendas[i];
        agendas[i] = agendas[i - 1];
        agendas[i - 1] = tmp;
      }
    }
  }
  const resData = { title: meetingInfo.title, agendas: agendas };
  console.log(resData);
  res.json(resData);
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
