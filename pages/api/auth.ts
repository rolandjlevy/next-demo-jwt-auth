import { withAuth } from "../../middleware";

const handler = (req: any, res: any) => {
  if (req.isLoggedIn) {
    const message = "This is a protected route";
    return res.status(200).json({ isLoggedIn: true, message });
  } else {
    const message = "Not authorized";
    return res.status(400).json({ isLoggedIn: false, message });
  }
};

export default withAuth(handler);
