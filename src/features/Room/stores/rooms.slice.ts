import { createSlice } from "@reduxjs/toolkit";
import type { Room, Rooms } from "../../../app.types";

interface RoomsState {
  allRooms: Rooms;
  currentRoom: Room | undefined;
  userIdsInPrivateRoom: Set<string> | undefined;
}

const initialState: RoomsState = {
  allRooms: [],
  currentRoom: undefined, 
  userIdsInPrivateRoom: undefined,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setAllRooms: (state, action) => ({
      ...state,
      allRooms: action.payload.allRooms,
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
    resetUserIdsInPrivateRoom: (state, action) => ({
      ...state,
      userIdsInPrivateRoom: initialState.userIdsInPrivateRoom,
    }),
  },
});

export const {
  setAllRooms,
  resetAllRooms,
  setCurrentRoom,
  resetCurrentRoom,
  setUserIdsInPrivateRoom,
  resetUserIdsInPrivateRoom,
} = roomsSlice.actions;

export default roomsSlice.reducer;