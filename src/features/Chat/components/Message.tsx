import React from 'react';
import { MessageProps } from '../types/chat.types';

function Message({ message, isUserSender, isFirstMessage, isLastMessage }: MessageProps) {
  const senderStyle: string = "first:mt-auto m-2 bg-slate-600 text-white p-3 rounded-full self-end shadow";
  const recipientStyle: string = "first:mt-auto m-2 bg-slate-400 text-white p-3 rounded-full self-start shadow";

  return (
    <li
      key={message.id}
      className={ isUserSender ? senderStyle : recipientStyle }
    >
      {message.content}
    </li>
  );
}

export default Message;