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

// app.post("/api/users/:uid", async (req, res) => {
//   const data = req.body;
//   console.log(data);
//   const newUser = await prisma.user.create({ data: data });
//   res.status(200).json(newUser);
// });
app.post("/api/users/:uid", postNewUser);

// app.post("/api/meetings/:uid", async (req, res) => {
//   const data = req.body;
//   const uid = req.params.uid;

//   let count = 1;
//   const agendas = data.agendas.map((agenda) => {
//     agenda.order = count;
//     count++;
//     return agenda;
//   });
//   console.log(agendas);

//   let newMeeting = {
//     title: data.title,
//     author: {
//       connect: {
//         uid: uid,
//       },
//     },
//     agendas: {
//       create: agendas,
//     },
//   };
//   console.log(newMeeting);
//   const createMeeting = await prisma.meeting.create({ data: newMeeting });
//   res.json(newMeeting);
// });
app.post("/api/meetings/:uid", postMeeting);

// app.put("/api/meetings/:uid", async (req, res) => {
//   const meetingId = Number(req.query.meetingId);
//   const data = req.body;

//   let count = 1;
//   const agendas = data.agendas.map((agenda) => {
//     agenda.order = count;
//     count++;
//     return agenda;
//   });

//   console.log("😭", agendas);

//   const deleteAgenda = await prisma.agenda.deleteMany({
//     where: {
//       meetingId: meetingId,
//     },
//   });

//   const putMeeting = await prisma.meeting.update({
//     where: {
//       id: meetingId,
//     },
//     data: { title: data.title },
//   });

//   data.agendas.map(async (agenda) => {
//     const createNewAgenda = await prisma.agenda.create({
//       data: {
//         title: agenda.title,
//         time: agenda.time,
//         order: agenda.order,
//         meeting: {
//           connect: {
//             id: meetingId,
//           },
//         },
//       },
//     });
//     console.log("🐱", createNewAgenda);
//   });

//   res.json(putMeeting);
// });

app.put("/api/meetings/:uid", putMeeting);

app.delete("/api/meetings/:uid", deleteMeeting);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server ready at ${PORT}`);
});
