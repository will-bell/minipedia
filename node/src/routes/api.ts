import { Router } from "express";
import pageData from "./pageData";
import search from "./search";

const router = Router();

// router.use("/updateRepository", updateRepository)
router.use("/pageData", pageData);
router.use("/search", search);

export default router;
