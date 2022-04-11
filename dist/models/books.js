"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const BookSchema = new mongoose_2.Schema({
    title: { type: String, required: true },
    authors: { type: String, required: true },
    yearPublished: { type: Number, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Book', BookSchema);
