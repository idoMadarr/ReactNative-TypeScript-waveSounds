import {MessageInstance} from './MessageInstance';

export class ShareInstance extends MessageInstance {
  title;
  artist;
  image;
  preview;

  constructor(
    messageId: string,
    message: string,
    sender: string,
    recipient: string,
    timestamp: string,
    userA: number,
    userB: number,
    title: string,
    artist: string,
    image: string,
    preview: string,
  ) {
    super(messageId, message, sender, recipient, timestamp, userA, userB);
    this.title = title;
    this.artist = artist;
    this.image = image;
    this.preview = preview;
  }
}
