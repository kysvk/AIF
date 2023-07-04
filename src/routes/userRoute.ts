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
router.get('/get',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    let result: any[] = [];
    result = await extendedDb.getUser();
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.get('/get/:user_id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {user_id} = req.params
    let result: any[] = [];
    result = await extendedDb.getUserbyID(user_id);
    res.json({result });  
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.put('/update',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {user_id,name,email} = req.body
    console.log(req.body)
    let result: any[] = [];
    result = await extendedDb.updateUser(email,name,user_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.delete('/delete',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {user_id} = req.body
    console.log(req.body)
    let result: any[] = [];
    result = await extendedDb.deleteUser(user_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;