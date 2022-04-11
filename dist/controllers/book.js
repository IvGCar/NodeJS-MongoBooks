"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const books_1 = __importDefault(require("../models/books"));
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_1.default.find().exec();
    return res.status(200).json({
        message: 'All titles:',
        result
    });
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, authors, yearPublished, description } = req.body;
    const book = new books_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        authors,
        yearPublished,
        description
    });
    if (title === "" || authors === "" || yearPublished === "" || description === "") {
        return res.status(400).json({
            error: 'Title, author(s), year of publication and description must be provided.'
        });
    }
    const result = yield book.save();
    return res.status(201).json({
        message: 'Title Created',
        result
    });
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, authors, yearPublished, description } = req.body;
    const result = yield books_1.default.findByIdAndUpdate(id, { title, authors, yearPublished, description }, { new: true });
    return res.status(201).json({
        message: 'Title Updated',
        result
    });
});
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_1.default.findByIdAndDelete(id);
    return res.status(201).json({
        message: 'Title Removed',
        result
    });
});
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield books_1.default.findById(id);
    return res.status(201).json({
        message: 'Title Searched:',
        result
    });
});
exports.default = { getAll, create, update, remove, get };
