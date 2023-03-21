import { Router } from "express";
import Wikipedia from "./src/wikipedia/Wikipedia";

const router = Router();

router.get("/titles/:searchString", (req, res) => {
  const searchString = req.params.searchString;
  Wikipedia.getTitles(searchString).then((titles) => res.send(titles));
});

export default router;
