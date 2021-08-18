import faker from "faker";
import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateData = async (): Promise<any> => {
  const arrayStudent = [];
  const arrayChallenge = [];
  // generate user
  for (let i = 0; i < 100; i++) {
    const id = nanoid();
    const name: string = faker.name.findName();
    const lastNameLength = name.toLowerCase().split(" ").length;
    const username: string =
      name.toLowerCase().split(" ")[0] +
      "." +
      name.toLowerCase().split(" ")[lastNameLength - 1];
    const email = `${username}@email.com`;
    arrayStudent.push({ id, name, email });
    for (let s = 0; s < 12; s++) {
      const challengeId = nanoid();
      const projectName = faker.git.commitMessage();
      arrayChallenge.push({
        id: challengeId,
        studentId: id,
        name: projectName,
        googleDriveFolder: `https://drive.google.com/f/${challengeId}`,
      });
    }
  }

  const truncateStudent = await prisma.$executeRaw(`TRUNCATE TABLE student`);
  const truncateChallenge = await prisma.$executeRaw(
    `TRUNCATE TABLE challenge`
  );
  const createStudent = await prisma.student.createMany({
    data: arrayStudent,
  });
  const createChallenge = await prisma.challenge.createMany({
    data: arrayChallenge,
  });
  const result = {
    truncateStudent,
    truncateChallenge,
    createStudent,
    createChallenge,
  };

  return result;
};

export default generateData;
