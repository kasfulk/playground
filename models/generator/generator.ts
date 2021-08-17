import faker from "faker";
import { nanoid } from "nanoid";
import mysql from "services/db";

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
    arrayStudent.push(`("${id}", "${name}", "${email}")`);
    for (let s = 0; s < 12; s++) {
      const challengeId = nanoid();
      const projectName = faker.git.commitMessage();
      arrayChallenge.push(
        `("${challengeId}","${id}","${projectName}","https://drive.google.com/f/${challengeId}")`
      );
    }
  }
  const studentJoin = arrayStudent.join(",\n");
  const challengeJoin = arrayChallenge.join(",\n");
  const sqlStudent = `INSERT INTO student (id, name, email) VALUES ${studentJoin}`;
  const sqlChallenge = `INSERT INTO challenge (id,studentId,name,googleDriveFolder) VALUES ${challengeJoin}`;
  const [sql] = await mysql.query(`
    TRUNCATE TABLE student;
    TRUNCATE TABLE challenge;
    ${sqlStudent};
    ${sqlChallenge};`);
  return sql;
};

export default generateData;
