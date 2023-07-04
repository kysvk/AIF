import 'dotenv'
import express, { Request, Response,NextFunction } from 'express';
import extendedDb from '../databases/dbCustomer';
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
    result = await extendedDb.getCustomer();
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.get('/get/:customer_id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {customer_id} = req.params
    let result: any[] = [];
    result = await extendedDb.getCustomerbyID(customer_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.post('/addcustomer', async function (req: Request, res: Response) {
  try {
    const { email,name,password} = req.body
    console.log(req.body)
    const hashedPassword = await bcrypt.hash(password, 10);
    if(!email || !name|| !password ) {
      return res.status(401).json({ message: 'Missing data' });
    }
    const user = await extendedDb.findCustomerbyEmail(email);
    
    if (user && user.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    let result: any[] = [];
    result = await extendedDb.addCustomer(email,name,hashedPassword);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.put('/update', async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {customer_id,name,email} = req.body
    console.log(req.body)
    let result: any[] = [];
    result = await extendedDb.updateCustomer(email,name,customer_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.delete('/delete', async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {customer_id} = req.body
    console.log(req.body)
    let result: any[] = [];
    result = await extendedDb.deleteCustomer(customer_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;