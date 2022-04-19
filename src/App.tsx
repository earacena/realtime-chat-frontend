import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useForm, SubmitHandler } from 'react-hook-form';

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
    formState: { errors }
  } = useForm<Input>({
    defaultValues: {
      message: '',
    }
  });

  const onSubmit: SubmitHandler<Input> = ({ message }) => {
    console.log(message);
    setMessages(messages.concat(message));
  };

  useEffect(() => {
    socket.current = io('ws://localhost:3001');
    socket.current.on("connect", () => {
      if (socket.current) {
        setSocketId(socket.current.id);
      }
    });
    return () => { socket.current?.disconnect(); };
  }, []);


  return (
      <div>
        {`Connected: ${socketId}`}
        <ul>
          {messages.map((m) => (
            <li className="p-1 odd:bg-white even:bg-slate-100">
              {m}
            </li>
          ))}
        </ul>
        <form className="flex-1 bottom-0 left-0 right-0 h-12" onSubmit={handleSubmit(onSubmit)}>
          <input className="flex-1 p-1 grow-1 rounded-lg bg-black text-white" {...register('message')} />
          <button className="rounded-full ml-1 text-white bg-black p-1" type="submit">Send</button>
        </form>
      </div>
    );
}

export default App;
