import { PrismaClient } from "@prisma/client";
import { Challenge } from "types/challenge.interface";
import { GradeStatus } from "./challenge.interface";
import { ReviewerClass } from "models/reviewer/reviewer.service";

export class ChallengeModel {
  private prisma = new PrismaClient();
  public reviewer = new ReviewerClass();
  private limit = 12;
  async findId(id: string): Promise<Challenge> {
    const challenge = await this.prisma.challenge.findUnique({
      where: {
        id: id,
      },
    });

    return challenge;
  }

  async findAllId(): Promise<{ id: string }[]> {
    const result = await this.prisma.challenge.findMany({
      select: {
        id: true,
      },
    });
    return result;
  }

  async findAll(page: number): Promise<{ data: Challenge[] }> {
    const pageSql = page - 1;
    const skip = pageSql * this.limit;
    try {
      const result = await this.prisma.challenge.findMany({
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

  async updateGrade(id: string, reviewer: string, grade: number): Promise<any> {
    let status: GradeStatus;
    switch (grade) {
      case 1:
      case 2:
      case 3:
      case 4:
        status = GradeStatus.GRADE_PASSED;
        break;
      case 5:
        status = GradeStatus.GRADE_FAILED;
        break;
      default:
        status = GradeStatus.SUBMITTED;
        break;
    }

    const result = await this.prisma.challenge.update({
      where: {
        id: id,
      },
      data: {
        grade: grade,
        reviewerId: reviewer,
        gradingStatus: status,
      },
    });
    const reviewerData = await this.prisma.student.findUnique({
      where: {
        id: result.reviewerId ? result.reviewerId : "",
      },
    });

    return {
      id,
      reviewer,
      status,
      result,
      reviewerData,
    };
  }
}
