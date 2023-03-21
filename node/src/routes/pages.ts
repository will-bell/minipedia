import { Router } from "express";

const router = Router();

router.get("/updateAll", (req, res) => {
  const pages = Wikipedia.getAllPages();
  updatePages(pages);
});
