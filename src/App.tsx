import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message, Messages, PrivateMessage, PrivateMessages, Rooms, Room } from './app.types';
import Chat from './Chat';
import SideBar from './Sidebar';

function App() {
  const socket = useRef<Socket>();
  const [messages, setMessages] = useState<Messages>([]);
  const [rooms, setRooms] = useState<Rooms>([]);
  const [socketId, setSocketId] = useState<string>('');
  const [userSocketIds, setUserSocketIds] = useState<string[]>([])
  const [currentRoom, setCurrentRoom] = useState<Room>({ roomId: '', roomName: '' });

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

    socket.current.on('message', (userSocketId, roomId, message) => {
      if (socket.current) {
        const payload: Message = {
          senderId: userSocketId,
          roomId,
          message,
        };
        setMessages((messages) => messages.concat(payload));
      }
    })

    socket.current.on('private room request', (userSocketId, roomId) => {
      setRooms((rooms) => rooms.concat({ roomId, roomName: `chat with ${userSocketId}` }));
      socket.current?.emit('join room', roomId);

      console.log(`new room [${roomId}] initialized with ${userSocketId}`);
    });

    socket.current.on('disconnect', () => {
      console.log("disconnected from socket");
    });

    return () => { socket.current?.disconnect(); };
  }, []);

  return (
    <div className="flex flex-row">
      <SideBar
        socket={socket.current}
        userSocketIds={userSocketIds}
        rooms={rooms}
        setCurrentRoom={setCurrentRoom}
      />
      <Chat
        socket={socket.current}
        messages={messages}
        setMessages={setMessages}
        currentRoom={currentRoom}
        socketId={socketId}
      />
    </div>
  );
}

export default App;
