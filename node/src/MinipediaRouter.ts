import { Router } from "express";
import LibrarianController from "./librarian/LibrarianController";

export default function MinipediaRouter(librarianController: LibrarianController): Router {
  const router = Router();
  router.post("/articles/add", librarianController.addArticle);
  router.post("/articles/drop", librarianController.dropArticle);
  router.post("/articles/update", librarianController.updateArticle);

  return router;
}
