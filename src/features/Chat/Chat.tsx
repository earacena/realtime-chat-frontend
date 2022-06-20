import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { retrieveAllMessages, sendMessage, startConnecting } from './stores/chat.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { setAuthenticatedUser } from '../Login/stores/auth.slice';

type Input = {
  message: string;
};

function Chat() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const messages = useAppSelector((state) => state.chat.messages);
  const currentRoom = useAppSelector((state) => state.rooms.currentRoom);
  const isConnected = useAppSelector((state) => state.chat.isConnected);
  const isConnecting = useAppSelector((state) => state.chat.isConnecting);


  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Input>({
    defaultValues: {
      message: '',
    }
  });

  useEffect(() => {
    // Check if a user session already exists
    if (!user.token) {
      const chatAppUserJSON = window.localStorage.getItem('chatAppUser');
      if (chatAppUserJSON) {
        const chatAppUser = JSON.parse(chatAppUserJSON);
        dispatch(setAuthenticatedUser({ user: chatAppUser }));
      } else {
        navigate("/login");
      }
    }
  });

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      dispatch(startConnecting());
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      dispatch(retrieveAllMessages({
        senderUsername: user.username,
        recipientUsername: currentRoom.roomId,
      }));
    }
  }, []);

  const onSubmit: SubmitHandler<Input> = ({ message }) => {
    // Prepare and send message
    if (currentRoom) {
      const newMessage = {
        senderUsername: user.username,
        recipientUsername: currentRoom.roomId,
        content: message,
      }
  
      dispatch(sendMessage({ newMessage }));
      console.log(`sending: ${currentRoom.roomId} | ${newMessage}`);
  
      reset({
        message: '',
      });
    }
  };

  return (
    <div className="flex flex-col p-3 w-full">
      <p className="bg-slate-100">
        {`Connected as: ${user.name}`}
      </p>
      <p className="bg-slate-100">
        {`Room: ${currentRoom ? currentRoom.roomName : 'not in a room'}`}
      </p>
      <ul>
        {messages.map((m, i) => (
          (
            currentRoom.roomId === m.recipientUsername ||
            currentRoom.roomId === m.senderUsername
          ) &&
          <li key={i} className="p-1 odd:bg-white even:bg-slate-100">
            {`${m.senderUsername} | ${m.content}`}
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
