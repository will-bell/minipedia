import Librarian from "./Librarian";
import { Request, Response } from "express";

// At some point this should also require an API key since we shouldn't let just
// anyone do this
interface ResetForm {
  apiKey?: string;
  titles: string[];
}

interface LibraryUpdateRequestForm {
  apiKey?: string;
  action: string;
  articleTitles?: string[];
}

export default class LibrarianController {
  constructor(private librarian: Librarian) {}

  // Make these arrow functions so that `this` is bound correctly when we give
  // them to the Router

  resetLibrarian = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as ResetForm;
    const titles = body.titles;

    this.librarian
      .resetLibrarian(titles)
      .then(() => response.status(200).send())
      .catch(() => response.status(400).send());
  };

  updateLibrary = async (request: Request, response: Response): Promise<void> => {
    const body = request.body as LibraryUpdateRequestForm;
    try {
      switch (body.action) {
        case "add":
          await this.librarian.addArticles(body.articleTitles ?? []);
          break;
        case "drop":
          await this.librarian.dropArticles(body.articleTitles ?? []);
          break;
        case "update":
          await this.librarian.updateArticles(body.articleTitles ?? []);
          break;
        case "updateAll":
          await this.librarian.updateAllArticles();
          break;
        default:
          throw Error(`no action matches: ${body.action}`);
      }
    } catch (error) {
      // should log this error somewhere
      response.status(400).send();
      return;
    }
    response.status(200).send();
  };

  addArticle = async (request: Request, response: Response): Promise<void> => {
    const title = request.params.title;
    this.librarian
      .addArticle(title)
      .then(() => response.status(200).send())
      .catch(() => response.status(400).send());
  };

  dropArticle = async (request: Request, response: Response): Promise<void> => {
    const title = request.params.title;
    this.librarian
      .dropArticle(title)
      .then(() => response.status(200).send())
      .catch(() => response.status(400).send());
  };

  updateArticle = async (request: Request, response: Response): Promise<void> => {
    const title = request.params.title;
    this.librarian
      .updateArticle(title)
      .then(() => response.status(200).send())
      .catch(() => response.status(400).send());
  };

  updateAllArticles = async (request: Request, response: Response): Promise<void> => {
    this.librarian
      .updateAllArticles()
      .then(() => response.status(200).send())
      .catch(() => response.status(500).send());
  };

  getArticleHtml = async (request: Request, response: Response): Promise<void> => {
    const title = request.params.title;
    this.librarian
      .getArticleHtml(title)
      .then((articleHtml) => response.status(200).send(articleHtml))
      .catch(() => response.status(400).send());
  };
}
