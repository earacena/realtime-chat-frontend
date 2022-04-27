import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Socket } from 'socket.io-client';

type Input = {
  message: string;
};

type Message = {
  senderId: string,
  message: string,
};

type PrivateMessage = {
  roomId: string,
  senderId: string,
  message: string,
};

interface ChatProps {
  socket: Socket | undefined,
  messages: Message[],
  setMessages: (value: React.SetStateAction<Message[]>) => void,
  privateMessages: PrivateMessage[],
  setPrivateMessages: (value: React.SetStateAction<PrivateMessage[]>) => void,
  viewingPrivateMessages: boolean,
  currentRoom: string,
  socketId: string,
};


function Chat({
  socket,
  messages,
  setMessages,
  privateMessages,
  setPrivateMessages,
  viewingPrivateMessages,
  currentRoom,
  socketId
}: ChatProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Input>({
    defaultValues: {
      message: '',
    }
  });

  const onSubmit: SubmitHandler<Input> = ({ message }) => {
    if (socket) {
      if (!currentRoom) {
        setMessages(
          messages.concat({
            senderId: socketId,
            message
          })
        );
        socket.emit('message', socketId, message);
      } else {
        setPrivateMessages(
          privateMessages.concat({
            roomId: currentRoom,
            senderId: socketId,
            message
          })
        );
        socket.emit('private message', currentRoom, message);
      }
    } else {
      console.log('socket is undefined')
    }

    reset({
      message: '',
    });
  };
  return (
    <div className="flex flex-col p-3 w-full">
      <p className="bg-slate-100">
        {`Connected as: ${socketId}`}
      </p>
      <p className="bg-slate-100">
        {`Room: ${currentRoom}`}
      </p>
      {!viewingPrivateMessages && <ul>
        {messages.map((m, i) => (
          <li key={i} className="p-1 odd:bg-white even:bg-slate-100">
            {`${m.senderId} | ${m.message}`}
          </li>
        ))}
      </ul>}
      {viewingPrivateMessages && <ul>
        {privateMessages.map((m, i) => (
          currentRoom === m.roomId &&
          <li key={i} className="p-1 odd:bg-white even:bg-slate-100">
            {`${m.roomId} | ${m.senderId} | ${m.message}`}
          </li>
        ))}
      </ul>}
      <form className="flex h-12 mt-auto" onSubmit={handleSubmit(onSubmit)}>
        <input className="grow p-1 center shadow-lg rounded-lg outline outline-1 hover:outline-2" {...register('message')} />
        <button className="rounded-lg shadow-lg ml-1 p-1 outline outline-1 hover:outline-2" type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
