import { createSlice } from "@reduxjs/toolkit";
import { Messages } from "../../../app.types";

const initialState: Messages = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (_state, action) => action.payload,
    resetMessages: () => initialState,
  },
});

export const {
  setMessages,
  resetMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;