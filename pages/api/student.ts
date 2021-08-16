import pool from "services/db";
import { nanoid } from "nanoid";
// import { Student } from "types/student.interface";

const handler = async (req, res) => {
  const {
    body: { name, email },
    method,
  } = req;
  switch (method) {
    case "POST":
      if (!name || !email) {
        res.status(400).json({
          message: "Invalid body parameter!",
        });
      }
      const dataId: string = nanoid();
      const query = await pool.execute(
        "INSERT INTO student (id,name,email) VALUES (?,?,?)",
        [dataId, name, email]
      );
      res.status(200).json({
        message: "Successfully inserted student!",
        query,
      });
      break;

    default:
      const [rows, fields] = await pool.query("SELECT * FROM student");
      res.status(200).json({
        fields: fields.map((field) => field.name),
        data: rows,
      });
      break;
  }
};

export default handler;
