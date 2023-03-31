// An interface for managing a library of minified Wikipedia articles
export default interface Librarian {
  resetLibrarian(titles: string[]): Promise<void>;

  addArticle(title: string): Promise<void>;
  addArticles(titles: string[]): Promise<void>;

  dropArticle(title: string): Promise<void>;
  dropArticles(titles: string[]): Promise<void>;

  updateArticle(title: string): Promise<void>;
  updateArticles(titles: string[]): Promise<void>;
  updateAllArticles(): Promise<void>;

  getArticleHtml(title: string): Promise<string>;
  getArticlesHtml(titles: string[]): Promise<string[]>;
}
