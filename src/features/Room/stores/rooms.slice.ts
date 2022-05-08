import { createSlice } from "@reduxjs/toolkit";
import type { Room, Rooms } from "../../../app.types";

interface RoomsState {
  allRooms: Rooms;
  currentRoom: Room;
  userIdsInPrivateRoom: string[];
}

const initialState: RoomsState = {
  allRooms: [],
  currentRoom: { roomId: 'default', roomName: 'default' },
  userIdsInPrivateRoom: [],
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setAllRooms: (state, action) => ({
      ...state,
      allRooms: action.payload.allRooms,
    }),
    addRoom: (state, action) => ({
      ...state,
      allRooms: state.allRooms.concat(action.payload.room),
    }),
    resetAllRooms: (state, action) => ({ 
      ...state,
      allRooms: initialState.allRooms,
    }),
    setCurrentRoom: (state, action) => ({
      ...state,
      currentRoom: action.payload.currentRoom
    }),
    resetCurrentRoom: (state, action) => ({
      ...state,
      currentRoom: initialState.currentRoom,
    }),
    setUserIdsInPrivateRoom: (state, action) => ({
      ...state,
      userIdsInPrivateRoom: action.payload.userIdsInPrivateRoom,
    }),
    addUserIdToPrivateRoom: (state, action) => ({
      ...state,
      userIdsInPrivateRoom: state.userIdsInPrivateRoom.concat(action.payload.userId),
    }),
    resetUserIdsInPrivateRoom: (state, action) => ({
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