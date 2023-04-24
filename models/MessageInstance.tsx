export class MessageInstance {
  id;
  message;
  sender;
  recipient;
  timestamp;

  constructor(
    id: string,
    message: string,
    sender: string,
    recipient: string,
    timestamp: string,
  ) {
    this.id = id;
    this.message = message;
    this.sender = sender;
    this.recipient = recipient;
    this.timestamp = timestamp;
  }
}
