import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from './features/Message';
import { roomsReducer } from './features/Room';
import { usersReducer } from './features/UserList';

const store = configureStore({ 
  reducer: {
    messages: messagesReducer,
    rooms: roomsReducer,
    users: usersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;