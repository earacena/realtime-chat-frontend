import {
  Record as RtRecord,
  Array as RtArray,
  String as RtString,
  Static as RtStatic,
  InstanceOf as RtInstanceOf,
} from 'runtypes';
import { Socket } from 'socket.io-client';

export const RoomType = RtRecord({
  roomId: RtString,
  roomName: RtString,
});
export type Room = RtStatic<typeof RoomType>;
export const RoomArray = RtArray(RoomType);
export type Rooms = RtStatic<typeof RoomArray>;

export const UserType = RtRecord({
  socketId: RtString,
});
export type User = RtStatic<typeof UserType>;
export const UserArray = RtArray(UserType);
export type Users = RtStatic<typeof UserArray>;

export const SocketType = RtInstanceOf(Socket);