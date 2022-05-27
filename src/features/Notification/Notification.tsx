import React from 'react';
import { useAppSelector } from '../../hooks';
import store from '../../store';
import { setNotification, resetNotification } from './stores/notification.slice';

function Notification() {
  const notification = useAppSelector((state) => state.notification);
  
  if (notification.message === '') {
    return null;
  }

  return (
    <div>
      {notification.message}
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
