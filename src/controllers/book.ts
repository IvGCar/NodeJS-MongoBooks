import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Books from "../models/books";

const getAll = async (req: Request, res: Response, next: NextFunction) => {

    const result = await Books.find().exec();

    return res.status(200).json({
        message: 'All titles:',
        result
    })
};
const create = async (req: Request, res:Response, next:NextFunction) => {

    const {title, authors, yearPublished, description} = req.body;

    const book = new Books({
        _id: new mongoose.Types.ObjectId(),
        title,
        authors,
        yearPublished,
        description
    });

    if(title===""||authors===""||yearPublished===""||description===""){
        return res.status(400).json({
            error: 'Title, author(s), year of publication and description must be provided.'
        })
    }

    const result = await book.save();

    return res.status(201).json({
        message: 'Title Created',
        result
    })
};
const update = async (req:Request, res:Response, next:NextFunction) => {

    const id =req.params.id;
    const {title, authors, yearPublished, description} = req.body;

    const result = await Books.findByIdAndUpdate(id, {title, authors, yearPublished, description}, {new: true})

    return res.status(201).json({
        message: 'Title Updated',
        result
    })
};
const remove = async (req:Request, res:Response, next:NextFunction) => {

    const id =req.params.id;

    const result = await Books.findByIdAndDelete(id)

    return res.status(201).json({
        message: 'Title Removed',
        result
    })
};
const get = async (req:Request, res:Response, next:NextFunction) => {

    const id =req.params.id;

    const result = await Books.findById(id);

    return res.status(201).json({
        message: 'Title Searched:',
        result
    })
};

export default {getAll, create, update, remove, get}
