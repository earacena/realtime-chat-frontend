import React from 'react';
import { useAppSelector } from '../../hooks';
import store from '../../store';
import { setNotification, resetNotification } from './stores/notification.slice';

function Notification() {
  const { type, message } = useAppSelector((state) => state.notification);
  
  return (
    <div>
      {message}
    </div>
  );
}

export const notify = (
  type: string,
  message: string,
  durationInSeconds: number,
) => {
  const { dispatch } = store;
  const newTimeoutId = setTimeout(() => {
    dispatch(resetNotification());
  }, durationInSeconds * 1000);
  dispatch(setNotification({ type, message, timeoutId: newTimeoutId }));
};

export default Notification;
