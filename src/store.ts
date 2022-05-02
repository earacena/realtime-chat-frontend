import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from './features/Message';
import { roomsReducer } from './features/Room';
import { socketReducer } from './features/Socket';

const store = configureStore({ 
  reducer: {
    socket: socketReducer,
    messages: messagesReducer,
    rooms: roomsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;