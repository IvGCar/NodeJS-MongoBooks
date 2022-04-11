import mongoose from 'mongoose';
import {Schema} from 'mongoose';
import Book from './interface/books';

const BookSchema : Schema = new Schema({
    title: {type: String, required:true},
    authors: {type: String, required:true},
    yearPublished: {type: Number, required:true},
    description: {type: String, required:true}
}, {
    timestamps: true
});

export default mongoose.model<Book>('Book', BookSchema);