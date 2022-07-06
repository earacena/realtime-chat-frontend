import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  RoomsState,
  allRoomsPayload,
  RoomPayload,
  CurrentRoomPayload,
  UserIdsInPrivateRoomPayload,
  UserIdPayload,
} from "../types/rooms.types";

const initialState: RoomsState = {
  allRooms: [],
  currentRoom: { roomId: 'default', roomName: 'default' },
  userIdsInPrivateRoom: [],
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setAllRooms: (state: RoomsState, action: PayloadAction<allRoomsPayload>) => ({
      ...state,
      allRooms: action.payload.allRooms,
    }),
    addRoom: (state: RoomsState, action: PayloadAction<RoomPayload>) => ({
      ...state,
      allRooms: state.allRooms.concat(action.payload.room),
    }),
    resetAllRooms: (state: RoomsState) => ({ 
      ...state,
      allRooms: initialState.allRooms,
    }),
    setCurrentRoom: (state: RoomsState, action: PayloadAction<CurrentRoomPayload>) => ({
      ...state,
      currentRoom: action.payload.currentRoom
    }),
    resetCurrentRoom: (state: RoomsState) => ({
      ...state,
      currentRoom: initialState.currentRoom,
    }),
    setUserIdsInPrivateRoom: (state: RoomsState, action: PayloadAction<UserIdsInPrivateRoomPayload>) => ({
      ...state,
      userIdsInPrivateRoom: action.payload.userIdsInPrivateRoom,
    }),
    addUserIdToPrivateRoom: (state: RoomsState, action: PayloadAction<UserIdPayload>) => ({
      ...state,
      userIdsInPrivateRoom: state.userIdsInPrivateRoom.concat(action.payload.userId),
    }),
    resetUserIdsInPrivateRoom: (state: RoomsState) => ({
      ...state,
      userIdsInPrivateRoom: initialState.userIdsInPrivateRoom,
    }),
  },
});

export const {
  setAllRooms,
  addRoom,
  resetAllRooms,
  setCurrentRoom,
  resetCurrentRoom,
  setUserIdsInPrivateRoom,
  resetUserIdsInPrivateRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;