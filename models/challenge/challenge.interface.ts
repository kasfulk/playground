import { Student } from "types/student.interface";
import { Challenge } from "types/challenge.interface";
import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

export interface StudentResult {
  student: Student;
  challenge: Challenge[];
}

export enum GradeStatus {
  UNSUBMITTED = "UNSUBMITTED",
  SUBMITTED = "SUBMITTED",
  GRADE_PASSED = "GRADE_PASSED",
  GRADE_FAILED = "GRADE_FAILED",
}

export interface StudentAll {
  data:
    | Student[]
    | RowDataPacket[]
    | RowDataPacket[][]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader;
}

export interface TotalPage {
  rows:
    | number
    | string
    | RowDataPacket[]
    | RowDataPacket[][]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader;
}
