import jwt from 'jsonwebtoken'

export const  generateAccessToken = async (user:any) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
}