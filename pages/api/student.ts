import { StudentModel } from "models/student/student.service";

const student = new StudentModel();

const handler = async (req, res): Promise<any> => {
  const {
    body: { page },
    method,
  } = req;
  console.log(method);
  switch (method) {
    case "POST": {
      const { data } = await student.findAll(page);
      res.status(200).json(data);
      break;
    }
    case "GET": {
      const { data } = await student.findAll(1);
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
