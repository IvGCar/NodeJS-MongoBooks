import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config"

const verifyTokens = async (req: Request, res: Response, next: NextFunction)=> {
    try{
        const authorization= req.header('authorization');
        const token = authorization?.split(' ')[1];
        if(!token){
            return res.status(400)
        }
        jwt.verify(token, config.secrets.token);
        next();
    }catch(error){
        res.status(400).json({error: 'Token invalid'})
    }
};
export default {verifyTokens}