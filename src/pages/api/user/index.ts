import {
  createUser,
  deleteUser,
  getUser,
  getUserId,
  updateUser,
} from "@/controller/UserController";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        req.query.uid ? await getUserId(req, res) : await getUser(req, res);
        break;
      case "POST":
        await createUser(req, res);
        break;
      case "PATCH":
        await updateUser(req, res);
        break;
      case "DELETE":
        await deleteUser(req, res);
        break;
      default:
        res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
}
