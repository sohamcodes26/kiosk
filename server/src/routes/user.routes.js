import { Router } from "express";
import { createDummyUser, simulateFingerprintLogin } from "../controllers/user.controller.js";

const router = Router();

router.post("/create", createDummyUser);
router.post("/login", simulateFingerprintLogin);

export default router;