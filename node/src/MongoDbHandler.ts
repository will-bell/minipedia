import { Db, MongoClient } from "mongodb";

export default class MongoDbHandler {
  private client: MongoClient;

  constructor(private connUrl: string | undefined) {
    if (!connUrl) {
      throw Error("No url was provided for MongoDB server.");
    }
    this.client = new MongoClient(connUrl);
  }

  async connect(): Promise<Db> {
    console.log("Connecting to MongoDB and returning the 'articles' database");
    await this.client.connect();

    return this.client.db("articles");
  }

  async close(): Promise<void> {
    console.log("Closing connection to MongoDB");
    await this.client.close();
  }
}
