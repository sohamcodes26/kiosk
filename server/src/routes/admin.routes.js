import { Router } from "express";
import { getAnalytics, downloadReportCSV } from "../controllers/admin.controller.js";

const router = Router();

router.get("/analytics", getAnalytics);
router.get("/download-report", downloadReportCSV);

export default router;
