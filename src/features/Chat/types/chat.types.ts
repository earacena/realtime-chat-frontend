import {
  Record as RtRecord,
  Array as RtArray,
  String as RtString,
  Static as RtStatic,
} from 'runtypes';

export const MessageType = RtRecord({
  roomId: RtString,
  senderId: RtString,
  message: RtString,
});
export type Message = RtStatic<typeof MessageType>;
export const MessageArray = RtArray(MessageType);
export type Messages = RtStatic<typeof MessageArray>;

export const PrivateMessageType = RtRecord({
  roomId: RtString,
  senderId: RtString,
  message: RtString,
});
export type PrivateMessage = RtStatic<typeof PrivateMessageType>;
export const PrivateMessageArray = RtArray(PrivateMessageType);
export type PrivateMessages = RtStatic<typeof PrivateMessageArray>;