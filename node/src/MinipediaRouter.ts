import { Router } from "express";
import LibrarianController from "./librarian/LibrarianController";

export default function MinipediaRouter(librarianController: LibrarianController): Router {
  const router = Router();
  router.post("/articles/add/:title", librarianController.addArticle);
  router.post("/articles/drop/:title", librarianController.dropArticle);
  router.post("/articles/update/:title", librarianController.updateArticle);
  router.post("/articles/updateAll");
  router.get("/articles/get/html/:title", librarianController.getArticleHtml);

  return router;
}
