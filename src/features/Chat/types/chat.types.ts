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

export type RequestRefreshPayload = {
  username: string,
};

export type ContactRefreshPayload = {
  username: string,
};

export type ContactRequestPayload = {
  toUser: {
    id: number,
    username: string,
  },
  fromUser: {
    id: number,
    username: string,
  }
};

export type SignalOnlineReplyPayload = {
  id: number,
  username: string,
};

export type MessageProps = {
  message: Message,
  isUserSender: boolean,
  isFirstMessage: boolean,
  isLastMessage: boolean,
};

export type RetrieveMessagesParams = {
  senderUsername: string,
  recipientUsername: string,
  token: string,
};
