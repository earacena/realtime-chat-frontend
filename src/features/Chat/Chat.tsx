import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { sendMessage } from './stores/chat.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';

type Input = {
  message: string;
};

function Chat() {
  const dispatch = useAppDispatch();
  const socketId = useAppSelector((state) => state.chat.socketId);
  const messages = useAppSelector((state) => state.chat.messages);
  const currentRoom = useAppSelector((state) => state.rooms.currentRoom);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Input>({
    defaultValues: {
      message: '',
    }
  });

  const onSubmit: SubmitHandler<Input> = ({ message }) => {
    // Prepare and send message
    const roomId = currentRoom ? currentRoom.roomId : 'default';
    const newMessage = {
      roomId,
      senderId: socketId,
      content: message,
    }

    dispatch(sendMessage({ newMessage }));
    console.log(`sending: ${roomId} | ${newMessage}`);

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
            {`${m.roomId} | ${m.senderId} | ${m.content}`}
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
