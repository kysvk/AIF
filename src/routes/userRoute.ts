import 'dotenv'
import express, { Request, Response, NextFunction } from 'express';
import extendedDb from '../databases/dbUser';
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { authentication } from '../middlewares/authentication'
import { generateAccessToken } from '../controllers/refreshToken'
import { User } from '../models/UserModel';
dotenv.config();
const router = express.Router();


router.get('/', authentication, async function (req: Request, res: Response, next: NextFunction) {
  try {
    let query = await extendedDb.getUser();
    // console.log(query)
    let users:User = query? query : [];
    // if(query.result) {
    //   users = query.result
    // } else {
    //   users = []
    // }
    res.json({users});
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.get('/:id', authentication, async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    let query = await extendedDb.getUserbyID(Number(id));
    console.log(query[0])
    if (query && query.length > 0) {
      let user: User = query[0];
      return res.json({ user });
    } 
    return res.status(400).send('not found');
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.put('/:id', authentication, async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { id, name, email } = req.body
    console.log(req.body)
    let user: User = await extendedDb.updateUser(email, name, id);
    res.json({ user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});
router.delete('/:id', authentication, async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    console.log(req.body)
    let user: User = await extendedDb.deleteUser(Number(id));
    res.json({ user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
});

export default router;