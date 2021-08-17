import { StudentModel } from "models/student/student.service";

const student = new StudentModel();

const handler = async (req, res): Promise<void> => {
  const { method } = req;
  switch (method) {
    case "GET": {
      const { rows } = await student.totalPage();
      res.status(200).json({ totalPage: rows[0].totalPage });
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
