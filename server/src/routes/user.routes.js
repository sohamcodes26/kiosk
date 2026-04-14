import { Router } from "express";
import { 
    createDummyUser, 
    simulateFingerprintLogin, 
    withdrawMoney, 
    depositMoney, 
    processRequest,
    getBalance,
    getMiniStatement,
    getFullStatement,
    openFD,
    changePin
} from "../controllers/user.controller.js";

const router = Router();


router.get("/balance/:userId", getBalance);
router.get("/mini-statement/:userId", getMiniStatement);
router.get("/statement", getFullStatement);
router.post("/fd", openFD);
router.post("/change-pin", changePin);

router.post("/withdraw", withdrawMoney);
router.post("/deposit", depositMoney);
router.post("/request", processRequest);


router.post("/create", createDummyUser);
router.post("/login", simulateFingerprintLogin);

export default router;