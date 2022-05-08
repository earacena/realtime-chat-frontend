import { createSlice } from '@reduxjs/toolkit';
import { Message } from '../../../app.types';

interface ChatState {
  messages: Message[];
  isConnecting: boolean;
  isConnected: boolean;
};

const initialState: ChatState = {
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
    setMessages: (state, action) => ({ ...state, messages:  action.payload.messages}),
    addMessage: (state, action) => ({ ...state, messages: state.messages.concat(action.payload.message)}),
    sendMessage: (state, action) => { return; },
  }
});

export const {
  startConnecting,
  connectionEstablished,
  disconnected,
  setMessages,
  addMessage,
  sendMessage,
} = chatSlice.actions;

export default chatSlice.reducer;