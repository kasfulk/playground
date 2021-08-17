import { ReviewerTypes } from "./reviewer.interface";

export class ReviewerClass {
  public reviewer = [];

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
    console.log(this.reviewer);
    return this.reviewer;
  }

  getReviewer(): ReviewerTypes[] {
    const reviewer = this.reviewer;
    return reviewer;
  }
}
