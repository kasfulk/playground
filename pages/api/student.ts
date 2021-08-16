import { StudentModel } from "models/student/student.service";

const student = new StudentModel();

const handler = async (req, res): Promise<any> => {
  const {
    body: { name, email },
    method,
  } = req;
  switch (method) {
    case "POST": {
      const result = await student.create(name, email);
      res.status(200).json(result);
      break;
    }
    case "GET": {
      const result = await student.findAll();
      res.status(200).json(result);
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
