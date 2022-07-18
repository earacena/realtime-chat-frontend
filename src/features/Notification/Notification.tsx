import React from 'react';
import { useAppSelector } from '../../hooks';

function Notification() {
  const { type, message } = useAppSelector((state) => state.notification);
  
  const baseNotificationStyle = 'outline outline-1 p-3 mb-2 rounded shadow-lg';
  const messageNotificationStyle = baseNotificationStyle.concat('outline-green-500 bg-green-100');
  const errorNotificationStyle = baseNotificationStyle.concat('outline-red-500 bg-red-100');
  const notificationStyle = (type === 'error') ? errorNotificationStyle : messageNotificationStyle;
  const style = (message === '') ? 'hidden' : notificationStyle;

  return (
    <div className={style}>
      {message}
    </div>
  );
}


export default Notification;
