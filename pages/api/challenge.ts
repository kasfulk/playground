import { ChallengeModel } from "models/challenge/challenge.service";

const challenge = new ChallengeModel();

const handler = async (req, res): Promise<any> => {
  const {
    body: { page },
    method,
  } = req;

  switch (method) {
    case "POST": {
      const { data } = await challenge.findAll(page);
      res.status(200).json(data);
      break;
    }
    case "GET": {
      const { data } = await challenge.findAll(1);
      res.status(200).json(data);
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
