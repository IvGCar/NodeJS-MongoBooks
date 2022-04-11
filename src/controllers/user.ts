import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import config from "../config/config"
import User from "../models/user";
import mongoose from "mongoose";

const login = async (req: Request, res: Response, next: NextFunction) =>{
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username}).exec();
    if(!user){
        return res.status(400).json({
            error: 'User not found'
        })
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword){
        return res.status(400).json({
            error:'Invalid password or username'
        })
    }

    const token= jwt.sign({username, id:user.id}, config.secrets.token);
    return res.status(200).json({
        message: 'Login Succesfull',
        token
    })
}

const register = async (req: Request, res: Response, next: NextFunction) =>{

    const username = req.body.username;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    const existentUser = await User.findOne({username}).exec();
    if(existentUser){
        return res.status(400).json({
            error: 'User name already in use, please type another'
        })
    }

    if(!passwordRegex.test(password)){
        return res.status(400).json({
            error: 'Your password must have between 6 and 16 characters, at least one number and at least one special character. Please try other password'
        })
    }

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username,
        password: passwordHash,
    })

    const result = await user.save();

    return res.status(200).json({
        message: 'User registered', 
        user: {
            id: result.id,
            username: result.username,
        }
    })

}

export default {register, login};