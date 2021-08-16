import mysql from "services/db";
import { nanoid } from "nanoid";
import { StudentResult, StudentAll } from "./student.interface";

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

    const [rows] = await mysql.query(
      `INSERT INTO student (id,name,email) VALUES (?,?,?);
      SELECT * FROM student WHERE id = LAST_INSER_ID()`,
      [dataId, name, email]
    );
    return {
      message: "Successfully inserted student!",
      student: rows[1][0],
    };
  }
}
