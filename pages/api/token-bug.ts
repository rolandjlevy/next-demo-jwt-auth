import { NextApiRequest, NextApiResponse } from "next";

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
  try {
    const token = req.cookies.token || ""; // Access the 'token' cookie directly
    console.log("req.cookies:", req.cookies);
    console.log("req.headers.cookies:", req.headers.cookies);

    if (token) {
      console.log("Token:", token);
      res.status(200).json({ token });
    } else {
      res.status(400).json({ error: "Token not found in cookie" });
    }
  } catch (error) {
    console.error("Error in handling cookie:", error);
    res.status(500).json({ error: "Server error" });
  }
}
