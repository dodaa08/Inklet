import express, { Router, NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
const router: Router = express.Router();
import config from "@repo/backend-common/config";

// Define an interface to extend Request for `id`
interface AuthRequest extends Request {
  id?: string;
}

export const middleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1] || "";
    const decode = jwt.verify(token, config.JWT_SECRET || "") as JwtPayload;

    if (typeof decode !== "object" || !decode.id) {
      return res.status(401).json({ error: "Invalid Token Payload" });
    }

    req.id = decode.id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid or Expired Token" });
  }
  
};

export default router;
