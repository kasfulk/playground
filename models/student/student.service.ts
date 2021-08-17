import mysql from "services/db";
import { nanoid } from "nanoid";
import { StudentResult, StudentAll, TotalPage } from "./student.interface";

export class StudentModel {
  private limit = 12;
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

  async totalPage(): Promise<TotalPage> {
    try {
      const sql = `SELECT CEIL(COUNT(*)/${this.limit}) AS totalPage FROM student`;
      const [rows] = await mysql.query(sql);
      return {
        rows,
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(page: number): Promise<StudentAll> {
    const pageSql = page - 1;
    const skip = pageSql * this.limit;
    const pagination = page ? `LIMIT ${skip},${this.limit}` : "";
    try {
      const [rows] = await mysql.query(`SELECT * FROM student ${pagination};`);
      console.log(rows);
      return {
        data: rows,
      };
    } catch (error) {
      console.log(error);
    }
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
      SELECT * FROM student WHERE id = LAST_INSERT_ID()`,
      [dataId, name, email]
    );
    return {
      message: "Successfully inserted student!",
      student: rows[1][0],
    };
  }
}
