import express from "express";
import path from "path";
import MessageController from "./MessageController";

const app = express();
const port = process.env.PORT || 3000;

const hksMessages = new MessageController("humblekorean");

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../resources/index.html"));
});

app.get("/poll", (req, res) => {
  res.status(200).json({ message: hksMessages.nextMessage() });
});

app.get("/clearMessageQueue", (req, res) => {
  hksMessages.clearMessages();
  res.status(200).send();
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
