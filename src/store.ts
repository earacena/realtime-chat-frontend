import { configureStore } from '@reduxjs/toolkit';
import { chatReducer } from './features/Chat';
import chatMiddleware from './features/Chat/middleware/chat.middleware';
import { roomsReducer } from './features/Rooms';
import { usersReducer } from './features/Users';
import { authReducer } from './features/Login/';
import { notificationReducer } from './features/Notification';
import { requestsReducer } from './features/Requests';

const store = configureStore({ 
  reducer: {
    chat: chatReducer,
    rooms: roomsReducer,
    users: usersReducer,
    auth: authReducer,
    notification: notificationReducer,
    requests: requestsReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([chatMiddleware]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;