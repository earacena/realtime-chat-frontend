import React from 'react';
import { MessageProps } from '../types/chat.types';

function Message({ message, isUserSender, isFirstMessage, isLastMessage }: MessageProps) {

  const firstSenderMessageStyle: string = " rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br mb-0";
  const middleSenderMessageStyle: string = " rounded-r rounded-tl-3xl rounded-bl-3xl mt-1 mb-0";
  const lastSenderMessageStyle: string = " rounded-bl-3xl rounded-tl-3xl rounded-br-3xl rounded-tr mt-1";

  let senderMessageStyle: string = "";
  if (isFirstMessage && isLastMessage) {
    senderMessageStyle = " rounded-full";
  } else if (isFirstMessage) {
    senderMessageStyle = firstSenderMessageStyle;
  } else if (isLastMessage) {
    senderMessageStyle = lastSenderMessageStyle;
  } else if (!isFirstMessage && !isLastMessage) {
    senderMessageStyle = middleSenderMessageStyle;
  }
 
  const firstRecipientMessageStyle: string = " rounded-bl rounded-tr-3xl rounded-tl-3xl rounded-br-3xl mb-0";
  const middleRecipientMessageStyle: string = " rounded-l rounded-tr-3xl rounded-br-3xl mt-1 mb-0";
  const lastRecipientMessageStyle: string = " rounded-tl rounded-br-3xl rounded-tr-3xl rounded-bl-3xl mt-1";

  let recipientMessageStyle: string = "";
  if (isFirstMessage && isLastMessage) {
    recipientMessageStyle = " rounded-full";
  } else if (isFirstMessage) {
    recipientMessageStyle = firstRecipientMessageStyle;
  } else if (isLastMessage) {
    recipientMessageStyle = lastRecipientMessageStyle;
  } else if (!isFirstMessage && !isLastMessage) {
    recipientMessageStyle = middleRecipientMessageStyle;
  }
 
  const senderStyle: string = "first:mt-auto m-2 bg-slate-600 text-white p-3 self-end shadow".concat(senderMessageStyle);
  const recipientStyle: string = "first:mt-auto m-2 bg-slate-400 text-white p-3 self-start shadow".concat(recipientMessageStyle);

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