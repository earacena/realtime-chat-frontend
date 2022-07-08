import React from 'react';
import { useAppSelector } from '../../../hooks';
import Message from './Message';

function Messages() {
  const messages = useAppSelector((state) => state.chat.messages);
  const currentRoom = useAppSelector((state) => state.rooms.currentRoom);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <ul className="flex flex-1 flex-col overflow-auto">
      {messages.map((m) =>
        (currentRoom.roomName === m.recipientUsername ||
          currentRoom.roomName === m.senderUsername) &&
        m.content !== "" &&
        <Message message={m} isUserSender={m.senderUsername === user.username} />
      )}
    </ul>
  );
};


export default Messages;