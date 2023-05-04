export class MessageInstance {
  messageId;
  message;
  sender;
  recipient;
  timestamp;
  userA;
  userB;

  constructor(
    messageId: string,
    message: string,
    sender: string,
    recipient: string,
    timestamp: string,
    userA: number,
    userB: number,
  ) {
    this.messageId = messageId;
    this.message = message;
    this.sender = sender;
    this.recipient = recipient;
    this.timestamp = timestamp;
    this.userA = userA;
    this.userB = userB;
  }
}
