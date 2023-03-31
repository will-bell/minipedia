import Wikipedia from "./wikipedia/Wikipedia";
import MongoLibrarian from "./librarian/MongoLibrarian";
import MinipediaRouter from "./MinipediaRouter";
import MinipediaApp from "./MinipediaApp";
import LibrarianController from "./librarian/LibrarianController";
import MongoDbHandler from "./MongoDbHandler";

async function initialize(): Promise<MinipediaApp> {
  // MongoDB Library
  const mongoDbHandler = new MongoDbHandler(process.env.DB_CONN_STR);
  const database = await mongoDbHandler.connect();

  const wikipedia = new Wikipedia();
  const librarian = new MongoLibrarian(database, wikipedia);

  const app = new MinipediaApp(MinipediaRouter(new LibrarianController(librarian)));

  // Cleanup
  app.on("stop", async () => await mongoDbHandler.close());

  return app;
}

if (require.main === module) {
  initialize().then((app) => app.run());
}
