import React from 'react';
import { useAppSelector } from '../../hooks';
import { setNotification, resetNotification } from './stores/notification.slice';

function Notification() {
  const { type, message } = useAppSelector((state) => state.notification);
  
  const baseNotificationStyle = 'outline outline-1 outline-red-500 bg-red-100 p-3 mb-2 rounded shadow-lg';
  const messageNotificationStyle = baseNotificationStyle.concat('');
  const errorNotificationStyle = baseNotificationStyle.concat('');
  const notificationStyle = (type === 'error') ? errorNotificationStyle : messageNotificationStyle;
  const style = (message === '') ? 'hidden' : notificationStyle;

  return (
    <div className={style}>
      {message}
    </div>
  );
}


export default Notification;
