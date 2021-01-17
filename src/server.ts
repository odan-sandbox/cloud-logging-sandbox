import express from "express";
import expressWinston from "express-winston";
import winston from "winston";
import * as lw from "@google-cloud/logging-winston";

const app = express();

const projectId = "cloud-logging-sandbox";
const winstonInstance = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new lw.LoggingWinston({ projectId }),
  ],
});

app.use(express.json());

app.get("/", (_, res) => {
  winstonInstance.info("poyo");
  res.send({ hello: true });
});

app.get("/error", () => {
  throw new Error("poyo");
});

app.use(expressWinston.logger({ winstonInstance }));
app.use(expressWinston.errorLogger({ winstonInstance }));

async function main(): Promise<void> {
  // app.use(await lw.express.makeMiddleware(winstonInstance));

  app.listen(3000, () => {
    console.log("http://localhost:3000");
  });
}

main();
