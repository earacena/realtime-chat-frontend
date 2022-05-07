import { configureStore } from '@reduxjs/toolkit';
import { chatReducer } from './features/Chat';
import { roomsReducer } from './features/Room';
import { usersReducer } from './features/UserList';

const store = configureStore({ 
  reducer: {
    chat: chatReducer,
    rooms: roomsReducer,
    users: usersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;