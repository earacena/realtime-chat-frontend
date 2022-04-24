import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Record as RtRecord,
  String as RtString,
  Array as RtArray,
} from 'runtypes';

const ChatMessageType = RtRecord({
  message: RtString,
  timestamp: RtString,
});

type Input = {
  message: string;
};

type Message = {
  senderId: string,
  message: string,
};

const OnlineUsersStatus = RtRecord({
  userIds: RtArray(RtString),
});

function App() {
  const socket = useRef<Socket>();

  const [messages, setMessages] = useState<Message[]>([]);
  const [socketId, setSocketId] = useState('');
  const [userSocketIds, setUserSocketIds] = useState<string[]>([])

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
    if (socket.current) {
      setMessages(
        messages.concat({
          senderId: socketId,
          message
        })
      );
      socket.current.emit('message', socketId, message);
    }

    reset({
      message: '',
    });
  };

  useEffect(() => {
    // Initialize socket connection
    socket.current = io('ws://localhost:3001');
    socket.current.on('connect', () => {
      if (socket.current) {
        setSocketId(socket.current.id);
      }
    });

    // Event handling
    socket.current.on('user connected', (userSocketId) => {
      setUserSocketIds((userSocketIds) => userSocketIds.concat(userSocketId));
    });

    socket.current.on('user disconnected', (userSocketId) => {
      setUserSocketIds((userSocketIds) => userSocketIds.filter((id) => id !== userSocketId));
    });

    socket.current.on('all connected users', (allUserSocketIds) => {
      setUserSocketIds(allUserSocketIds);
    });

    socket.current.on('message', (userSocketId, message) => {
      if (socket.current) {
        const payload: Message = {
          senderId: userSocketId,
          message,
        };
        setMessages((messages) => messages.concat(payload));
      }
    })

    socket.current.on('disconnect', () => {
      console.log("disconnected from socket");
    });

    return () => { socket.current?.disconnect(); };
  }, []);

  // const handleReceiverChange = (id: string) => {
  //   setCurrentRoomId(id);
  //   console.log(`Now talking to ${id}`);
  // }

  return (
      <div className="flex flex-row">
        <div className="outline outline-1 h-screen p-1">
          <ul>
            {userSocketIds.map((id, i) => ( 
              <li key={i} className="odd:bg-white even:bg-slate-200">
                <button type="button">{id}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col p-3 w-full">
          <p className="bg-slate-100">
            {`Connected as: ${socketId}`}
          </p>
          <ul>
            {messages.map((m, i) => (
              <li key={i} className="p-1 odd:bg-white even:bg-slate-100">
                {`${m.senderId} | ${m.message}`}
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
