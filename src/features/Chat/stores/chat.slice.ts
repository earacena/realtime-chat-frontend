import { createSlice } from '@reduxjs/toolkit';
import { Messages } from '../types/chat.types';

interface ChatState {
  socketId: string;
  messages: Messages;
  isConnecting: boolean;
  isConnected: boolean;
};

const initialState: ChatState = {
  socketId: '',
  messages: [],
  isConnecting: false,
  isConnected: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    startConnecting: (state) => ({ ...state, isConnecting: true }),
    connectionEstablished: (state) => ({ ...state, isConnecting: false, isConnected: true }),
    disconnected: (state) => ({ ...state, isConnected: false }),
    setSocketId: (state, action) => ({ ...state, socketId: action.payload.socketId}),
    setMessages: (state, action) => ({ ...state, messages:  action.payload.messages}),
    addMessage: (state, action) => ({ ...state, messages: state.messages.concat(action.payload.message)}),
    sendMessage: (state, action) => { return; },
    retrieveAllMessages: (state, action) => { return; },
  }
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
} = chatSlice.actions;

export default chatSlice.reducer;