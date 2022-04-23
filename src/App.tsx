import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Record as RtRecord,
  String as RtString,
} from 'runtypes';

const ChatMessageType = RtRecord({
  message: RtString,
  timestamp: RtString,
});

type Input = {
  message: string;
};

function App() {
  const socket = useRef<Socket>();

  const [messages, setMessages] = useState<string[]>([]);
  const [socketId, setSocketId] = useState('');

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
    const timestamp = new Date().toUTCString();
    setMessages(messages.concat(`${timestamp} | ${message}`));
    if (socket.current) {
      socket.current.emit('message', JSON.stringify({ message, timestamp }));
    }

    reset({
      message: '',
    });
  };

  useEffect(() => {
    console.log(socket);
    socket.current = io('ws://localhost:3001');
    socket.current.on('connect', () => {
      if (socket.current) {
        setSocketId(socket.current.id);
      }
    });
    socket.current.on('message', (messageJSON) => {
      const { timestamp, message } = ChatMessageType.check(JSON.parse(messageJSON));
      setMessages((messages) => messages.concat(`${timestamp} | ${message}`));
    });
    socket.current.on('disconnect', () => {
      console.log("disconnected from socket");
    });

    return () => { socket.current?.disconnect(); };
  }, []);


  return (
      <div className="flex flex-row">
        <div className="outline outline-1 h-screen p-1">
          test
        </div>
        <div className="flex flex-col p-3 w-full">
          {`Connected: ${socketId}`}
          <ul>
            {messages.map((m, i) => (
              <li key={i} className="p-1 odd:bg-white even:bg-slate-100">
                {m}
              </li>
            ))}
          </ul>
          <form className="flex h-12 mt-auto" onSubmit={handleSubmit(onSubmit)}>
            <input className="grow p-1 center shadow-lg rounded-lg outline outline-1 hover:outline-2" {...register('message')} />
            <button className="rounded-lg shadow-lg ml-1 p-1 outline outline-1 hover:outline-2" type="submit">Send</button>
          </form>
        </div>
      </div>
    );
}

export default App;
