import 'dotenv'
import express, { Request, Response,NextFunction } from 'express';
import extendedDb from '../databases/dbAdmin';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import {authentication} from '../controllers/authentication'
import { generateAccessToken } from '../controllers/refreshToken'
dotenv.config();
const router = express.Router();

//only user login
router.get('/get', async function (req: Request, res: Response,next: NextFunction) {
  try {
    let result: any[] = [];
    result = await extendedDb.getAdmin();
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.get('/get/:admin_id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {admin_id} = req.params
    let result: any[] = [];
    result = await extendedDb.getAdminById(admin_id);
    res.json({result });  
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.put('/update', async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {admin_id,name,email} = req.body
    console.log(req.body)
    let result: any[] = [];
    result = await extendedDb.updateAdmin(email,name,admin_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.delete('/delete', async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {admin_id} = req.body
    console.log(req.body)
    let result: any[] = [];
    result = await extendedDb.deleteAdmin(admin_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;