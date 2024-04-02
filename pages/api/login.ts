import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { serialize } from "cookie";

const SECRET_KEY = process.env.SECRET_KEY;

type Data = {
  token: string;
};

type ErrorResponse = {
  error: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorResponse>
) {
  if (req.method?.toLocaleLowerCase() !== "post") {
    return res.status(405).end();
  }

  try {
    const { username, password } = req.body || {};

    let loggedIn = false;

    if (!username || !password) {
      const errorMessage = "Username and password are required";
      return res.status(400).json({ error: errorMessage });
    }
    loggedIn = true; // Result of User.find({})

    const token = jwt.sign({ username, loggedIn }, SECRET_KEY || "");

    const cookieOptions = { httpOnly: true, path: "/" };
    const serializedCookie = serialize("token", token, cookieOptions);
    res.setHeader("Set-Cookie", serializedCookie);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in handling login:", error);
    res.status(500).json({ error: "Server error" });
  }
}
