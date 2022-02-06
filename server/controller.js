const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getMeetings = async (req, res) => {
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
  res.json(meetings);
};
const getAgendas = async (req, res) => {
  const meetingId = Number(req.query.meetingId);

  const meetingInfo = await prisma.meeting.findUnique({
    where: {
      id: meetingId,
    },
  });

  if (meetingInfo) {
    let agendas = await prisma.agenda.findMany({
      where: {
        meetingId: meetingId,
      },
    });

    if (agendas.length > 0) {
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
      res.status(200).json(resData);
    }
  }
  if (!meetingInfo) {
    res.status(403).json("not auther");
  }
};

const postNewUser = async (req, res) => {
  const data = req.body;
  console.log(data);
  const newUser = await prisma.user.create({ data: data });
  res.status(200).json(newUser);
};

const postMeeting = async (req, res) => {
  const data = req.body;
  const uid = req.params.uid;

  let count = 1;
  const agendas = data.agendas.map((agenda) => {
    agenda.order = count;
    count++;
    return agenda;
  });

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

  const createMeeting = await prisma.meeting.create({ data: newMeeting });
  res.json(createMeeting);
};

const putMeeting = async (req, res) => {
  const meetingId = Number(req.query.meetingId);
  const data = req.body;

  let count = 1;
  const agendas = data.agendas.map((agenda) => {
    agenda.order = count;
    count++;
    return agenda;
  });

  const deleteAgenda = await prisma.agenda.deleteMany({
    where: {
      meetingId: meetingId,
    },
  });

  const updateMeeting = await prisma.meeting.update({
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
  });

  res.json(putMeeting);
};

const deleteMeeting = async (req, res) => {
  const meetingId = Number(req.query.meetingId);

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
};

module.exports = {
  postNewUser,
  getMeetings,
  postMeeting,
  deleteMeeting,
  putMeeting,
  getAgendas,
};
