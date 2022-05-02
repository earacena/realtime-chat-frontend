import { createSlice } from "@reduxjs/toolkit";
import type { Socket } from 'socket.io-client';

const initialState: Socket | undefined = undefined; 

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => action.payload.socket, 
    resetSocket: (state, action) => initialState, 
  }
});

export const {
  setSocket,
  resetSocket,
} = socketSlice.actions;

export default socketSlice.reducer;