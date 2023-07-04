import 'dotenv'
import express, { Request, Response } from 'express';
import extendedDb from '../databases/dbUser';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
dotenv.config();
const router = express.Router();

//Registation
router.post('/', async function (req: Request, res: Response) {
  try {
    const { email,name,password} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    if(!email || !name|| !password ) {
      return res.status(401).json({ message: 'Missing data' });
    }
    const user = await extendedDb.findUserbyEmail(email);
    
    if (user && user.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    let result: any[] = [];
    result = await extendedDb.addUser(email,name,hashedPassword);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;