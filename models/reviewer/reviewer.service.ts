import { ReviewerTypes } from "./reviewer.interface";
import { StudentModel } from "models/student/student.service";

export class ReviewerClass {
  public reviewer = [];
  private student = new StudentModel();

  setReviewer(newReviewer: string): ReviewerTypes[] {
    if (this.reviewer.length == 1) {
      this.reviewer[0] = {
        idReviewer: newReviewer,
      };
      return this.reviewer;
    }
    this.reviewer.push({
      idReviewer: newReviewer,
    });
    return this.reviewer;
  }

  getReviewer(): ReviewerTypes[] {
    const reviewer = this.reviewer;
    return reviewer;
  }

  async getReviewerData(): Promise<any> {
    const { idReviewer } = this.reviewer[0]
      ? this.reviewer[0]
      : { idReviewer: "" };
    const result = await this.student.findId(idReviewer);
    return result;
  }
}
