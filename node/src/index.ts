import * as express from "express";
import * as cors from "cors";
import api from "./routes/api";

const app = express();
app.use(cors());

const port = process.env.PORT;

app.use("/api", api);

app.listen(port, function () {
  console.log(`wikispeed.io listening on port ${port}!`);
});
