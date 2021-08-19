import { ChallengeModel } from "models/challenge/challenge.service";

const challenge = new ChallengeModel();

const handler = async (req, res): Promise<any> => {
  const {
    body: { grade, reviewer },
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET": {
      const result = await challenge.findId(id);
      res.status(200).send(result);
      break;
    }
    case "PUT": {
      const result = await challenge.updateGrade(id, reviewer, grade);
      res.status(200).send(result);
      break;
    }
  }
};

export default handler;
