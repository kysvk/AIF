import 'dotenv'
import express, { Request, Response,NextFunction } from 'express';
import extendedDb from '../databases/dbCategory';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import {authentication} from '../middlewares/authentication'
import { generateAccessToken } from '../controllers/refreshToken'
import { Category } from '../models/CategoryModel';
dotenv.config();
const router = express.Router();

//only user login
router.get('/',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    let query = await extendedDb.getCategory();
    let category: Category = query? query : [];
    res.json({ category });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.get('/:id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const { id } = req.params
    let query = await extendedDb.getCategoryById(Number(id));
    console.log(query[0])
    if (query && query.length > 0) {
      let category: Category = query[0];
      return res.json({ category });
    } 
    return res.status(400).send('not found');
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.post('/',authentication, async function (req: Request, res: Response) {
  try {
    const { name } = req.body
    if (!name) {
        return res.status(400).send('please fill name')
    }
    let category : Category = await extendedDb.addCategory(name);
    res.json({category});
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.put('/:id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {id} = req.params
    const {name} = req.body
    console.log(req.body)
    let category : Category = await extendedDb.updateCategory(Number(id),name);
    res.json({ category });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

router.delete('/:id',authentication, async function (req: Request, res: Response,next: NextFunction) {
  try {
    const {id} = req.params
    let category : Category = await extendedDb.deleteCategory(Number(id));
    res.json({ category });  
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;