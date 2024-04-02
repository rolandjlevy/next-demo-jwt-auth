import { withAuth } from "../../middleware";

const handler = (req: any, res: any) => {
  console.log("loggedIn:", req.loggedIn);
  return res.status(200).json({ message: "This is a protected route" });
};

export default withAuth(handler);
