import mysql from "services/db";
import { nanoid } from "nanoid";
import { Student } from "types/student.interface";
import { Challenge } from "types/challenge.interface";

interface StudentResult {
  student: Student;
  challenge: Challenge[];
}

interface StudentAll {
  data: Student[];
}

export class StudentModel {
  async findId(id: string): Promise<StudentResult> {
    const [rows] = await mysql.query(
      `SELECT * FROM student WHERE id = ? ;
        SELECT * FROM challenge WHERE studentId = ?`,
      [id, id]
    );
    return {
      student: rows[0][0],
      challenge: rows[1],
    };
  }

  async findAll(): Promise<StudentAll> {
    const [rows] = await mysql.query(`SELECT * FROM student`);
    return {
      data: rows[0],
    };
  }

  async create(name: string, email: string): Promise<any> {
    if (!name || !email) {
      return {
        message: "Invalid body parameter!",
      };
    }
    const dataId: string = nanoid();

    const query = await mysql.execute(
      "INSERT INTO students (id,name,email) VALUES (?,?,?)",
      [dataId, name, email]
    );
    return {
      message: "Successfully inserted student!",
      query,
    };
  }
}
