import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState, NotificationPayload } from '../types/notification.types';

const initialState: NotificationState = {
  type: '',
  message: '',
  timeoutId: undefined,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state: NotificationState, action: PayloadAction<NotificationPayload>) => ({
      ...state,
      type: action.payload.type,
      message: action.payload.message,
      timeoutId: action.payload.timeoutId,
    }),
    resetNotification: (state: NotificationState) => initialState,
  }
});

export const {
  setNotification,
  resetNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
