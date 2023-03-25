import { Db } from "mongodb";
import Wikipedia from "../wikipedia/Wikipedia";
import Librarian from "./Librarian";

export default class MongoLibrarian implements Librarian {
  constructor(private articlesdb: Db, private wikipedia: Wikipedia) {}

  async addArticle(title: string): Promise<void> {
    //
  }
  async dropArticle(title: string): Promise<void> {
    //
  }
  async updateArticle(title: string): Promise<void> {
    //
  }
}
