import {MessageInstance} from './MessageInstance';

export class ShareInstance extends MessageInstance {
  title;
  artist;
  image;
  preview;

  constructor(
    id: string,
    message: string,
    sender: string,
    recipient: string,
    timestamp: string,
    title: string,
    artist: string,
    image: string,
    preview: string,
  ) {
    super(id, message, sender, recipient, timestamp);
    this.title = title;
    this.artist = artist;
    this.image = image;
    this.preview = preview;
  }
}
