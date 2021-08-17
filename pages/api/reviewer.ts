import { ReviewerClass } from "models/reviewer/reviewer.service";

const reviewer = new ReviewerClass();

const handler = (req, res): void => {
  const {
    body: { idReviewer },
    method,
  } = req;
  switch (method) {
    case "POST": {
      const [reviewerData] = reviewer.setReviewer(idReviewer);
      res.status(200).json(reviewerData);
      break;
    }
    case "GET": {
      const [reviewerData] = reviewer.getReviewer();
      res.status(200).json(reviewerData);
      break;
    }

    default: {
      res.status(404).json({
        message: "Method not supported!",
      });
      break;
    }
  }
};

export default handler;
