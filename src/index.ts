import express from "express";
import path from "path";
import MessageController from "./MessageController";

const app = express();
const port = process.env.PORT || 3000;

const messages: { [key: string]: MessageController } = {};

app.set("strict routing", true);
app.set("x-powered-by", false);

app.get("/", (req, res) => {
  res.redirect("/humblekorean/");
});

app.get("/:username/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../resources/index.html"));
});

app.get("/:username/start", (req, res) => {
  messages[req.params.username] = new MessageController(req.params.username);
  res.status(200).send();
});

app.get("/:username/stop", (req, res) => {
  messages[req.params.username] = undefined;
  res.status(200).send();
});

app.get("/:username/poll", (req, res) => {
  res
    .status(200)
    .json({ message: messages[req.params.username].nextMessage() });
});

app.get("/:username/clearMessageQueue", (req, res) => {
  messages[req.params.username].clearMessages();
  res.status(200).send();
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
