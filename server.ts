import { watch } from "chokidar";
import express, { Request, Response, NextFunction, urlencoded, json } from "express";
import mongoose, { Connection } from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "@routes";
import { logger } from "@utils";


const { SERVER_PORT, DB_HOST, DB_PORT, DB_ROOT } = process.env;

const app: any = express();
const dbURI = `mongodb://root:root@${DB_HOST}:${DB_PORT}/${DB_ROOT}`;
// eslint-disable-next-line max-len
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    user: "admin",
    pass: "admin",
  })
  .catch((e) => console.log(e));
const db: Connection = mongoose.connection;

app.use(
  cors({
    origin: ["http://localhost:6900"],
    credentials: true,
  })
);
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// Main
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).send(err || err.m);
  logger.log("error", err);
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toLocaleTimeString()}: ${req.method} ${req.url}`);
  next();
});

routes(app);

const watcher = watch('./src')
watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing /dist/ module cache from server")
    Object.keys(require.cache).forEach(function(id) {
      console.log(id);
      if (/[\/\\]src[\/\\]/.test(id)) delete require.cache[id]
    })
  })
})

// start express server
app.listen(SERVER_PORT, () => {
  db.once("open", async () => {
    console.log("MongoDB is connected");
  });
  db.on("error", (e) => {
    console.log("Server got trouble connecting", e);
  });
  console.log("Server is up at ", SERVER_PORT);
});


