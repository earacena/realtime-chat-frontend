import {
  Record as RtRecord,
  Array as RtArray,
  String as RtString,
  Static as RtStatic,
} from 'runtypes';

export const MessageType = RtRecord({
  roomId: RtString,
  senderId: RtString,
  content: RtString,
});
export type Message = RtStatic<typeof MessageType>;
export const MessageArray = RtArray(MessageType);
export type Messages = RtStatic<typeof MessageArray>;