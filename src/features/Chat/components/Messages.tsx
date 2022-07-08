import React from 'react';
import { useAppSelector } from '../../../hooks';
import { selectMessagesByUsernames } from '../stores/chat.slice';
import Message from './Message';

function Messages() {
  const messages = useAppSelector(selectMessagesByUsernames);
  const user = useAppSelector((state) => state.auth.user);

  return (
    <ul className="flex flex-1 flex-col overflow-auto">
      {messages.map((m, i) =>
        m.content !== "" &&
        <Message
          key={m.id}
          message={m}
          isUserSender={m.senderUsername === user.username}
          isFirstMessage={(i === 0) || ((i > 0) && (messages[i-1].senderUsername !== messages[i].senderUsername))}
          isLastMessage={(i === messages.length-1) || ((i < messages.length-1) &&(messages[i+1].senderUsername !== messages[i].senderUsername))}
        />
      )}
    </ul>
  );
};


export default Messages;