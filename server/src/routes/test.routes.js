import express from "express";
import { addDummyTransaction } from "../controllers/test.controller.js";

const router = express.Router();

router.get("/add", addDummyTransaction);

export default router;