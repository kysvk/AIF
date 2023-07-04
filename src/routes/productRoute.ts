import 'dotenv'
import express, { Request, Response,NextFunction } from 'express';
import extendedDb from '../databases/dbProduct';
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
    result = await extendedDb.getProduct();
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.get('/get/:product_id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {product_id} = req.params
    let result: any[] = [];
    result = await extendedDb.getProductByID(product_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.post('/addproduct',authentication, async function (req: Request, res: Response) {
  try {
    const { product_name, price} = req.body
    console.log(req.body)
    if(!price || !product_name ) {
      return res.status(401).json({ message: 'Missing data' });
    }
    const user = await extendedDb.findProductbyEmail(product_name);
    
    if (user && user.length > 0) {
      return res.status(400).json({ message: 'product name already exists' });
    }
    let result: any[] = [];
    result = await extendedDb.addProduct(product_name, price);
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.put('/update',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {product_id,price,product_name} = req.body
    console.log(req.body)
    let result: any[] = [];
    result = await extendedDb.updateProduct(product_name,price,product_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.delete('/delete',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {product_id} = req.body
    console.log(req.body)
    let result: any[] = [];
    result = await extendedDb.deleteProduct(product_id);
    res.json({result });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;