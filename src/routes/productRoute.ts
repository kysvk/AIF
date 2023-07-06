import 'dotenv'
import express, { Request, Response,NextFunction } from 'express';
import extendedDb from '../databases/dbProduct';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import {authentication} from '../middlewares/authentication'
import { generateAccessToken } from '../controllers/refreshToken'
import { Product } from '../models/ProductModel';
dotenv.config();
const router = express.Router();

//only user login
router.get('/',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    let query = await extendedDb.getProduct();
    let product : Product = query?query: []
    res.json({ product });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.get('/:id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const { id } = req.params
    let query = await extendedDb.getProductByID(Number(id));
    console.log(query[0])
    if (query && query.length > 0) {
      let product: Product = query[0];
      return res.json({ product });
    } 
    return res.status(400).send('not found');
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.post('/',authentication, async function (req: Request, res: Response) {
  try {
    const { name,price,category } = req.body
    if (!name || !price || !category) {
        return res.status(400).send('please fill product name')
    }
    let product : Product = await extendedDb.addProduct(name,price,category);
    res.json({product});
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.put('/:id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {id} = req.params
    const {price,name} = req.body
    console.log(req.body)
    let product : Product = await extendedDb.updateProduct(name,price,Number(id));
    res.json({ product });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.delete('/:id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {id} = req.params
    console.log(req.body)
    let product : Product = await extendedDb.deleteProduct(Number(id));
    res.json({ product });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;