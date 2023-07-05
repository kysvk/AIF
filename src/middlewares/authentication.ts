import dotenv from 'dotenv'
dotenv.config();
import { Request, Response, NextFunction } from 'express';
var jwt = require("jsonwebtoken");
import { generateAccessToken } from '../controllers/refreshToken'

export const authentication = async (req: Request, res: Response, next: NextFunction) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = await req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  try {
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
 
  } catch (ex) {
    return res.status(400).json({ error: "token invalid" });
  }
}

