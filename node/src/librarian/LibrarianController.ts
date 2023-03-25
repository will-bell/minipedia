import Librarian from "./Librarian";
import { Request, Response } from "express";

export default class LibrarianController {
  constructor(private librarian: Librarian) {}

  async addArticle(request: Request, response: Response): Promise<void> {
    const title = request.params.title;
    this.librarian.addArticle(title);

    response.status(202);
    response.send();
  }

  async dropArticle(request: Request, response: Response): Promise<void> {
    const title = request.params.title;
    this.librarian.dropArticle(title);

    response.status(202);
    response.send();
  }

  async updateArticle(request: Request, response: Response): Promise<void> {
    const title = request.params.title;
    this.librarian.updateArticle(title);

    response.status(202);
    response.send();
  }
}
