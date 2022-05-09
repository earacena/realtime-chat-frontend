import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { chatReducer } from './features/Chat';
import chatMiddleware from './features/Chat/middleware/chat.middleware';
import { roomsReducer } from './features/Room';
import { usersReducer } from './features/UserList';

const store = configureStore({ 
  reducer: {
    chat: chatReducer,
    rooms: roomsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([chatMiddleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;