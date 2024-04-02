import { IncomingMessage, ServerResponse } from "http";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

type CustomRequest = IncomingMessage & { cookies: { token?: string } };
type CustomHandler = (req: CustomRequest, res: ServerResponse) => void;

const SECRET_KEY = process.env.SECRET_KEY;

export const withAuth = (handler: CustomHandler) => {
  // return (req: CustomRequest, res: Response) => {
  return (req: any, res: any) => {
    const cookies = parse(req.headers.cookie || "");
    const tokenFromCookie = cookies.token || "";
    let isLoggedIn = false;

    if (!tokenFromCookie) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decodedToken = jwt.verify(tokenFromCookie, SECRET_KEY || "") as {
        loggedIn: boolean;
      };
      isLoggedIn = decodedToken.loggedIn;
      req.loggedIn = isLoggedIn;
      // console.log("middleware > loggedIn:", isLoggedIn);
      return handler(req, res);
    } catch (err) {
      console.error(`Access denied: verification error: ${err}`);
      return res.status(401).json({ message: "Unauthorized" });
    }

    // const token = req.cookies.token;

    // if (!token) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // try {
    //   const decoded = jwt.verify(token, SECRET_KEY || "");
    //   req.user = decoded;
    //   return handler(req, res);
    // } catch (error) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }
  };
};
