import express from "express";
import expressWinston from "express-winston";
import winston from "winston";
import { LoggingWinston } from "@google-cloud/logging-winston";

const app = express();

const projectId = "cloud-logging-sandbox";
const winstonInstance = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new LoggingWinston({ projectId }),
  ],
});
app.use(expressWinston.logger({ winstonInstance }));

app.use(express.json());

app.get("/", (_, res) => {
  res.send({ hello: true });
});

app.get("/error", () => {
  throw new Error("poyo");
});

async function main(): Promise<void> {
  app.listen(3000, () => {
    console.log("http://localhost:3000");
  });
}

main();
