import { Logging } from "@google-cloud/logging";

async function main(): Promise<void> {
  const projectId = "cloud-logging-sandbox";
  const logging = new Logging({ projectId });

  const log = logging.log("test");

  log.info(log.entry({ text: "poyo" }));
}

main();

process.on("unhandledRejection", (reason) => {
  console.error(reason);
  process.exit(1);
});
