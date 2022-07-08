import React from 'react';
import { useAppSelector } from '../../../hooks';

function Messages() {
  const messages = useAppSelector((state) => state.chat.messages);
  const currentRoom = useAppSelector((state) => state.rooms.currentRoom);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <ul className="flex flex-1 flex-col overflow-auto">
      {messages.map((m, i) =>
        (currentRoom.roomName === m.recipientUsername ||
          currentRoom.roomName === m.senderUsername) &&
        m.content !== "" &&
        m.senderUsername === user.username ? (
          <li
            key={i}
            className="first:mt-auto m-2 bg-slate-600 text-white p-3 rounded-full self-end shadow"
          >
            {m.content}
          </li>
        ) : (
          <li
            key={i}
            className="first:mt-auto m-2 bg-slate-400 text-white p-3 rounded-full self-start shadow"
          >
            {m.content}
          </li>
        )
      )}
    </ul>
  );
};


export default Messages;