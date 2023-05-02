import express from "express";
import tmi from "tmi.js";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

const messages: string[] = [];

const client = new tmi.Client({
  channels: ["humblekorean"],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  messages.push(`${tags["display-name"]} says ${message}`);
});

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../resources/index.html"));
});

app.get("/poll", (req, res) => {
  const nextMessage = messages.shift();
  res.status(200).json({ message: nextMessage });
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
