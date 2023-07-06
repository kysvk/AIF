import { Request, Response, NextFunction } from 'express';
import {User} from '../models/UserModel'
import extendedDb from '../databases/dbUser';


export const allowAdminAll = async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.user.role )
        if(req.user.role !== "ADMIN"){
            res.status(401)
            return res.send('Not Allowed')
        }
        next()
}
export const allowAdminById = async (req: Request, res: Response, next: NextFunction) => {
           const paramsId = req.params.id
           const id = Number(paramsId)
    //   console.log(req.user.role)
    //   console.log(req.user.id)
    //   console.log(id)
    //   if((req.user,id)){
      if((req.user.role != "ADMIN") && (req.user.id != id)){
        // res.status(401)
        return res.send('Not Allowed')
    }
        next()
}

// const canViewProject = async (user: User,paramsId:number ): Promise<boolean> => {
//     console.log(user.role)
//     const db = await extendedDb.getUserbyID(11)
//     console.log(db)
//     const ROLE = "ADMIN"
//     return user.role === "ADMIgs" 
//     // || user.user_id === paramsId;

// };

