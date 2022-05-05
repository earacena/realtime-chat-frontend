import { createSlice } from "@reduxjs/toolkit";
import { Messages } from "../../../app.types";

const initialState: Messages = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (_state, action) => action.payload.messages,
    addMessage: (state, action) => state.concat(action.payload.message),
    resetMessages: () => initialState,
  },
});

export const {
  setMessages,
  addMessage,
  resetMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;