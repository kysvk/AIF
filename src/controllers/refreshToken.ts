import jwt from 'jsonwebtoken'
import {User} from '../models/UserModel'

export const  generateAccessToken = async (user:any) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}