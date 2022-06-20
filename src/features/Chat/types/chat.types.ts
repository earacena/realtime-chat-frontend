import {
  Record as RtRecord,
  Array as RtArray,
  String as RtString,
  Static as RtStatic,
  Number as RtNumber,
} from 'runtypes';

export const MessageType = RtRecord({
  id: RtNumber,
  senderUsername: RtString,
  recipientUsername: RtString,
  content: RtString,
});
export type Message = RtStatic<typeof MessageType>;
export const MessageArray = RtArray(MessageType);
export type Messages = RtStatic<typeof MessageArray>;

export interface ChatState {
  socketId: string;
  messages: Messages;
  isConnecting: boolean;
  isConnected: boolean;
};

export type SocketIdPayload = {
  socketId: string;
};

export type NewMessagePayload = {
  newMessage: {
    recipientUsername: string,
    senderUsername: string,
    content: string,
  }
};

export type MessagePayload = {
  message: Message,
};

export type MessagesPayload = {
  messages: Messages;
};

export type SenderRecipientPayload = {
  senderUsername: string,
  recipientUsername: string,
};

export type RequestPayload = {
  username: string,
};