"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const book_1 = __importDefault(require("../controllers/book"));
const router = express_1.default.Router();
router.get('/books', book_1.default.getAll); //allbks
router.post('/books', book_1.default.create); //add
router.patch('/books/:id', book_1.default.update); //edit
router.delete('/books/:id', book_1.default.remove); //Delete
router.get('/books/:id', book_1.default.get); //single bk
module.exports = router;
