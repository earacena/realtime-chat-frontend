import {
  Number as RtNumber,
  Record as RtRecord,
  String as RtString,
  Array as RtArray,
} from 'runtypes';
import { MessageType } from './chat.types';

const UserConnectedEventPayload = RtRecord({
  userId: RtString,
});

const UserDisconnectedEventPayload = RtRecord({
  userId: RtString,
});

const ConnectedUserListPayload = RtRecord({
  allUserSocketIds: RtArray(RtString),
});

const MessagePayload = RtRecord({
  message: MessageType,
});

const MessagesPayload = RtRecord({
  messages: RtArray(MessageType),
});

const PrivateRoomRequestPayload = RtRecord({
  userSocketId: RtString,
  roomId: RtString,
});

const SignalOnlinePayload = RtRecord({
  id: RtNumber,
  username: RtString,
});

const SignalOfflinePayload = RtRecord({
  id: RtNumber,
});

const ContactRequestPayload = RtRecord({
  id: RtNumber,
  username: RtString,
});

const chatEventType = {
  UserConnectedEventPayload,
  UserDisconnectedEventPayload,
  ConnectedUserListPayload,
  MessagePayload,
  MessagesPayload,
  PrivateRoomRequestPayload,
  SignalOnlinePayload,
  SignalOfflinePayload,
  ContactRequestPayload,
};

export default chatEventType;