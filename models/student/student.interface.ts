import { Student } from "types/student.interface";
import { Challenge } from "types/challenge.interface";

export interface StudentResult {
  student: Student;
  challenge: Challenge[];
}

export interface StudentAll {
  data: Student[];
}
