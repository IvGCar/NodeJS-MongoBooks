import {Document} from 'mongoose';

export default interface Book extends Document{
    title: string,
    authors: string,
    yearPublished: number,
    description: string
} 