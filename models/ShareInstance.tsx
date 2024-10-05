import {MessageInstance} from './MessageInstance';

export class ShareInstance extends MessageInstance {
  title;
  artist;
  image;
  url;

  constructor(
    messageId: string,
    message: string,
    sender: string,
    recipient: string,
    timestamp: string,
    userA: string,
    userB: string,
    title: string,
    artist: string,
    image: string,
    url: string,
  ) {
    super(messageId, message, sender, recipient, timestamp, userA, userB);
    this.title = title;
    this.artist = artist;
    this.image = image;
    this.url = url;
  }
}
