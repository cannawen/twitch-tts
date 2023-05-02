import tmi from "tmi.js";

export default class MessageController {
  private username: string;
  private messages: string[];

  constructor(username: string) {
    this.username = username;
    this.messages = ["Hello! Welcome to your TTS Page"];
    const client = new tmi.Client({
      channels: [username],
    });
    client.connect();

    client.on("message", (channel, tags, message, self) => {
      const messageUsername = tags["username"];
      if (messageUsername !== this.username) {
        this.messages.push(`${messageUsername} says ${message}`);
      }
    });
  }

  public nextMessage() {
    return this.messages.shift();
  }

  public clearMessages() {
    this.messages = [];
  }
}
