
import express, { Request, Response } from 'express';
import extendedDb from '../databases/dbUser';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import {generateAccessToken} from '../controllers/refreshToken'
dotenv.config();
const router = express.Router();

//login 
router.post('/', async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await extendedDb.findUserbyEmail(email);
    
    if (user.length > 0) {
      const decodePassword = await bcrypt.compare(password, user[0].password);
      
      if (decodePassword) {
        // console.log(user[0])
const accessToken = await generateAccessToken({id:user[0].user_id,name:user[0].name,email:user[0].email,role:user[0].role});
console.log(accessToken)
    
        res.json({ status: "ok", message: "login success", token: accessToken });
      } else {
        return res.status(400).json({ message: 'Invalid password' });
      }
    } else {
      return res.status(400).json({ message: 'Email does not exist' });
    }
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
export default router;