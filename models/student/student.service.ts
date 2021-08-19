import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { StudentResult, StudentAll } from "./student.interface";
import { StudentData } from "types/student.interface";

export class StudentModel {
  private prisma = new PrismaClient();
  private limit = 12;
  async findId(id: string): Promise<StudentResult> {
    const student = await this.prisma.student.findUnique({
      where: {
        id,
      },
    });
    const challenges = await this.prisma.challenge.findMany({
      where: {
        studentId: id,
      },
    });

    return {
      student: student,
      challenge: challenges,
    };
  }

  async totalPage(): Promise<any> {
    try {
      const result = await this.prisma.student.aggregate({
        _count: {
          id: true,
        },
      });
      return {
        totalPage: Math.ceil(result._count.id / this.limit),
      };
    } catch (error) {
      return error;
    }
  }

  async findAll(page: number): Promise<StudentAll> {
    const pageSql = page - 1;
    const skip = pageSql * this.limit;
    try {
      const result = await this.prisma.student.findMany({
        skip: skip,
        take: this.limit,
      });
      console.log(result);
      return {
        data: result,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async allStudent(): Promise<StudentData> {
    try {
      const result = await this.prisma.student.findMany({
        select: {
          id: true,
        },
      });
      console.log(result);
      return {
        data: result,
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

    const rows = await this.prisma.$queryRaw(
      `INSERT INTO student (id,name,email) VALUES (${dataId},${name},${email});
      SELECT * FROM student WHERE id = LAST_INSERT_ID()`
    );
    return {
      message: "Successfully inserted student!",
      student: rows,
    };
  }
}
