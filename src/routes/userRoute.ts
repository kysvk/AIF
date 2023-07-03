import 'dotenv'
import express, { Request, Response,NextFunction } from 'express';
import extendedDb from '../databases/dbUser';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import {authentication} from '../controllers/authentication'
import { generateAccessToken } from '../controllers/refreshToken'
dotenv.config();
const router = express.Router();

//only user login
router.get('/',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    let result: any[] = [];
    result = await extendedDb.getCustomer();
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;