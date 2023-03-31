import { Db, MongoClient } from "mongodb";

export default class MongoDbHandler {
  private client: MongoClient;

  constructor(connUrl: string | undefined) {
    if (!connUrl) {
      throw Error("No url was provided for MongoDB server.");
    }
    this.client = new MongoClient(connUrl);
  }

  async connect(): Promise<Db> {
    console.log("Connecting to MongoDB and returning the 'articles' database");
    await this.client.connect();
    console.log("Connected to the MongoDB database");

    return this.client.db("articles");
  }

  close = async (): Promise<void> => {
    console.log("Closing connection to MongoDB");
    await this.client.close();
  };
}
