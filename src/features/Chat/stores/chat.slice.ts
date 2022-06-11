import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ChatState,
  SocketIdPayload,
  NewMessagePayload,
  MessagePayload,
  MessagesPayload,
  RoomIdPayload,
  RequestPayload,
} from "../types/chat.types";

const initialState: ChatState = {
  socketId: '',
  messages: [],
  isConnecting: false,
  isConnected: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    startConnecting: (state: ChatState) => ({ ...state, isConnecting: true }),
    connectionEstablished: (state: ChatState) => ({
      ...state,
      isConnecting: false,
      isConnected: true,
    }),
    disconnected: (state: ChatState) => ({ ...state, isConnected: false }),
    setSocketId: (
      state: ChatState,
      action: PayloadAction<SocketIdPayload>
    ) => ({ ...state, socketId: action.payload.socketId }),
    setMessages: (
      state: ChatState,
      action: PayloadAction<MessagesPayload>
    ) => ({ ...state, messages: action.payload.messages }),
    addMessage: (state: ChatState, action: PayloadAction<MessagePayload>) => ({
      ...state,
      messages: state.messages.concat(action.payload.message),
    }),
    sendMessage: (state: ChatState, action: PayloadAction<NewMessagePayload>) => {
      return;
    },
    retrieveAllMessages: (state: ChatState, action: PayloadAction<RoomIdPayload>) => {
      return;
    },
    sendRequestRefresh: (state: ChatState, action: PayloadAction<RequestPayload>) => {
      return;
    },
  },
});

export const {
  startConnecting,
  connectionEstablished,
  disconnected,
  setSocketId,
  setMessages,
  addMessage,
  sendMessage,
  retrieveAllMessages,
  sendRequestRefresh,
} = chatSlice.actions;

export default chatSlice.reducer;
