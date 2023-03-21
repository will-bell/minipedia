import { Router } from "express";
import Wikipedia from "./src/wikipedia/Wikipedia";

const router = Router();

router.get("/html/:title", (req, res) => {
  const title = req.params.title;
  Wikipedia.getPageHtml(title).then((pageHtml) => res.send(pageHtml));
});

export default router;
