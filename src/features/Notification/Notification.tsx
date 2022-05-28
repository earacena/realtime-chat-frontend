import React from 'react';
import { useAppSelector } from '../../hooks';
import { setNotification, resetNotification } from './stores/notification.slice';

function Notification() {
  const { type, message } = useAppSelector((state) => state.notification);
  
  const baseNotificationStyle = `{message === undefined ? 'hidden' : 'flex'}`;
  const messageNotificationStyle = baseNotificationStyle.concat('');
  const errorNotificationStyle = baseNotificationStyle.concat('');
  const notificationStyle = (type === 'error') ? errorNotificationStyle : messageNotificationStyle;

  return (
    <div className={notificationStyle}>
      {message}
    </div>
  );
}


export default Notification;
