import generateData from "models/generator/generator";

export default async (req, res): Promise<any> => {
  const sql = await generateData();
  res.status(200).json({ generateResult: sql });
};
