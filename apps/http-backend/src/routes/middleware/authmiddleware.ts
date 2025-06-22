import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "@repo/backend-common/config";

export interface AuthRequest extends Request {
  id?: string;
}

export const middleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Authorization header missing or malformed" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Token not provided" });
    return;
  }

  try {
    const decode = jwt.verify(token, config.JWT_SECRET || "") as JwtPayload;

    if (typeof decode !== "object" || !decode.id) {
      res.status(401).json({ error: "Invalid Token Payload" });
      return;
    }

    req.id = decode.id;
    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid Token" });
  }
};
