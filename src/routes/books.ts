import express from "express";
import controller from '../controllers/book'

const router = express.Router();

router.get('/books', controller.getAll); //allbks
router.post('/books', controller.create); //add
router.patch('/books/:id', controller.update); //edit
router.delete('/books/:id', controller.remove); //Delete
router.get('/books/:id', controller.get); //single bk

export = router;