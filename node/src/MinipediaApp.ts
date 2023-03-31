import * as EventEmitter from "events";
import * as express from "express";
import * as cors from "cors";
import { Server } from "http";
import { promisify } from "util";

export default class MinipediaApp extends EventEmitter {
  expressApp: express.Application;
  server: Server | null = null;
  port = 3001;

  constructor(public router: express.Router) {
    super();
    this.expressApp = this.buildExpressApp();
  }

  private buildExpressApp(): express.Application {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use("/", this.router);

    return app;
  }

  async run(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.expressApp.listen(this.port, () => {
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async stop(): Promise<void> {
    if (this.server) {
      this.emit("stop");
      return promisify(this.server.close.bind(this.server))();
    }
  }
}
