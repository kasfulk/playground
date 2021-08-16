import { StudentModel } from "models/student/student.service";

const student = new StudentModel();

const handler = async (req, res): Promise<any> => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET": {
      const result = await student.findId(id);
      res.status(200).send(result);
      break;
    }
  }
};

export default handler;
