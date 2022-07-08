import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import {
  ChatState,
  SocketIdPayload,
  NewMessagePayload,
  MessagePayload,
  MessagesPayload,
  RequestRefreshPayload,
  ContactRefreshPayload,
  SignalOnlineReplyPayload,
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
    resetSocketId: (state: ChatState) => ({
      ...state,
      socketId: initialState.socketId,
    }),
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
    resetMessages: (state: ChatState) => ({
      ...state,
      messages: initialState.messages,
    }),
    sendRequestRefresh: (state: ChatState, action: PayloadAction<RequestRefreshPayload>) => {
      return;
    },
    sendContactRefresh: (state: ChatState, action: PayloadAction<ContactRefreshPayload>) => {
      return;
    },
    signalOnline: (state: ChatState) => {
      return;
    },
    signalOffline: (state: ChatState) => {
      return;
    },
    signalOnlineReply: (state: ChatState, action: PayloadAction<SignalOnlineReplyPayload>) => {
      return;
    },
  },
});

const selectMessages = (state: RootState) => state.chat.messages;

export const selectSortedMessages = createSelector([selectMessages], (messages) => {
  return [...messages].sort((a, b) => a.id - b.id);
});

export const selectRoomName = (state: RootState) => state.rooms.currentRoom.roomName;

export const selectMessagesByUsernames = createSelector(
  [selectSortedMessages, selectRoomName], 
  (sortedMessages, roomName) => (
    sortedMessages.filter((m) => (roomName === m.recipientUsername || roomName === m.senderUsername) && m.content !== '')
  )
);

export const {
  startConnecting,
  connectionEstablished,
  disconnected,
  setSocketId,
  setMessages,
  addMessage,
  sendMessage,
  sendRequestRefresh,
  sendContactRefresh,
  signalOnline,
  signalOffline,
  resetMessages,
  resetSocketId,
  signalOnlineReply,
} = chatSlice.actions;

export default chatSlice.reducer;
