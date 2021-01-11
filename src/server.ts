import express from "express";
import winston from "winston";
import expressWinston from "express-winston";

const winstonInstance = winston.createLogger({
  format: winston.format.combine(winston.format.prettyPrint()),
  transports: [new winston.transports.Console()],
});

const app = express();

app.use(express.json());
app.use(expressWinston.logger({ winstonInstance }));

app.get("/", (_, res) => {
  res.send({ hello: true });
});

async function main(): Promise<void> {
  app.listen(3000, () => {
    console.log("http://localhost:3000");
  });
}

main();
