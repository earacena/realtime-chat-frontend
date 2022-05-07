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
    setIsConnecting: (state) => ({ ...state, isConnecting: true }),
    setIsConnected: (state) => ({ ...state, isConnecting: false, isConnected: true }),
    setMessages: (state, action) => ({ ...state, messages:  action.payload.messages}),
    addMessage: (state, action) => ({ ...state, messages: state.messages.concat(action.payload.message)}),
    sendMessage: (state, action) => { return; },
  }
});

export const chatActions = chatSlice.actions;

export default chatSlice;