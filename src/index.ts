import express from "express";
import tmi from "tmi.js";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

const messages: string[] = [];

const STREAMER_USERNAME = "humblekorean";

const client = new tmi.Client({
  channels: [STREAMER_USERNAME],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
  const username = tags["username"];
  if (username !== STREAMER_USERNAME) {
    messages.push(`${username} says ${message}`);
  }
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
