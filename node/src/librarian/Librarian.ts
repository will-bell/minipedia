// An interface for managing a library of minified Wikipedia articles
export default interface Librarian {
  addArticle(title: string): Promise<void>;
  dropArticle(title: string): Promise<void>;
  updateArticle(title: string): Promise<void>;
}
