import { Collection, Db } from "mongodb";
import Wikipedia from "../wikipedia/Wikipedia";
import Librarian from "./Librarian";
import Article from "../models/article";

export default class MongoLibrarian implements Librarian {
  private collections: { articles?: Collection<Article> } = {};

  constructor(database: Db, private wikipedia: Wikipedia) {
    this.collections.articles = database.collection("articles");
  }

  // RESET
  async resetLibrarian(titles: string[]): Promise<void> {
    //
  }

  // ADD
  async addArticle(title: string): Promise<void> {
    const articleHtml = (await this.wikipedia.getPageHtml(title)) ?? "";
    this.collections.articles?.insertOne(new Article(title, articleHtml));
  }
  async addArticles(titles: string[]): Promise<void> {
    //
  }

  // DROP
  async dropArticle(title: string): Promise<void> {
    this.collections.articles?.deleteOne({ title });
  }
  async dropArticles(titles: string[]): Promise<void> {
    //
  }

  // UPDATE
  async updateArticle(title: string): Promise<void> {
    const articleHtml = (await this.wikipedia.getPageHtml(title)) ?? "";
    this.collections.articles?.updateOne({ title }, { $set: { html: articleHtml } });
  }
  async updateArticles(titles: string[]): Promise<void> {
    //
  }
  async updateAllArticles(): Promise<void> {
    //
  }

  // GET
  async getArticleHtml(title: string): Promise<string> {
    const article = await this.collections.articles?.findOne({ title });
    return article?.html ?? "";
  }
  async getArticlesHtml(titles: string[]): Promise<string[]> {
    return ["don't", "use", "this", "yet"];
  }
}
