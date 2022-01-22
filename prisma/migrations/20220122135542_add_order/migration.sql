-- CreateTable
CREATE TABLE "Agenda" (
    "id" SERIAL NOT NULL,
    "order" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "time" INTEGER NOT NULL,
    "meetingId" INTEGER NOT NULL,

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("uid") ON DELETE CASCADE ON UPDATE CASCADE;
