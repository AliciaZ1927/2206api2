import { Router } from "express";
import { createbook, deletebook, getbooks, updatebook, getbook } from "../controllers/books.controller.js";

const router = Router();

router.get("/books", getbooks);
router.post("/books", createbook);
router.put("/books/:id", updatebook);
router.delete("/books/:id", deletebook);
router.get("/books/:id", getbook);




export default router;