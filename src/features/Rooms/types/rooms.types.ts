import {
  Number as RtNumber,
  String as RtString,
  Static as RtStatic,
  Array as RtArray,
  Record as RtRecord,
} from 'runtypes';

export const RoomType = RtRecord({
  roomId: RtNumber,
  roomName: RtString,
});
export type Room = RtStatic<typeof RoomType>;
export const RoomArray = RtArray(RoomType);
export type Rooms = RtStatic<typeof RoomArray>;

export interface RoomsState {
  allRooms: Rooms;
  currentRoom: Room;
  userIdsInPrivateRoom: string[];
}

export type allRoomsPayload = {
  allRooms: Rooms,
};

export type RoomPayload = {
  room: Room,
};

export type CurrentRoomPayload = {
  currentRoom: Room,
};

export type UserIdPayload = {
  userId: string,
};

export type UserIdsInPrivateRoomPayload = {
  userIdsInPrivateRoom: string[],
}
