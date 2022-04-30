import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Socket } from 'socket.io-client';
import type { Messages, PrivateMessages, Room } from './app.types';

type Input = {
  message: string;
};

interface ChatProps {
  socket: Socket | undefined,
  messages: Messages,
  setMessages: (value: React.SetStateAction<Messages>) => void,
  currentRoom: Room,
  socketId: string,
};


function Chat({
  socket,
  messages,
  setMessages,
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
    const roomId = currentRoom ? currentRoom.roomId : 'default';
    if (socket) {
      setMessages(messages.concat({
        senderId: socket?.id,
        roomId,
        message,
      }));

      socket.emit('message', roomId, socket.id, message);
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
        {`Room: ${currentRoom.roomName}`}
      </p>
      <ul>
        {messages.map((m, i) => (
          currentRoom.roomId === m.roomId && 
          <li key={i} className="p-1 odd:bg-white even:bg-slate-100">
            {`${m.roomId} | ${m.senderId} | ${m.message}`}
          </li>
        ))}
      </ul>
      <form className="flex h-12 mt-auto" onSubmit={handleSubmit(onSubmit)}>
        <input className="grow p-1 center shadow-lg rounded-lg outline outline-1 hover:outline-2" {...register('message')} />
        <button className="rounded-lg shadow-lg ml-1 p-1 outline outline-1 hover:outline-2" type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
