import pool from "services/db";
import { nanoid } from "nanoid";

const handler = async (req, res) => {
  const {
    query: { id },
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
      const dataId = nanoid();
      const query = await pool.execute(
        "INSERT INTO students (id,name,email) VALUES (?,?,?)",
        [dataId, name, email]
      );
      res.status(200).json({
        message: "Successfully inserted student!",
        query,
      });
      break;

    default:
      const [rows, fields] = await pool.query(
        "SELECT * FROM student WHERE id = ?",
        id
      );
      res.status(200).json({
        fields: fields.map((field) => field.name),
        data: rows,
      });
      break;
  }
};

export default handler;
