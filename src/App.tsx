import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Chat from './Chat';
import SideBar from './Sidebar';

type Message = {
  senderId: string,
  message: string,
};

type PrivateMessage = {
  roomId: string,
  senderId: string,
  message: string,
};

function App() {
  const socket = useRef<Socket>();
  const [viewingPrivateMessages, setViewingPrivateMessages] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [privateMessages, setPrivateMessages] = useState<PrivateMessage[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [socketId, setSocketId] = useState('');
  const [userSocketIds, setUserSocketIds] = useState<string[]>([])
  const [currentRoom, setCurrentRoom] = useState<string>('');

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

    socket.current.on('private message', (roomId, userSocketId, message) => {
      if (socket.current) {
        const payload: PrivateMessage = {
          roomId: roomId,
          senderId: userSocketId,
          message,
        };
        setPrivateMessages((privateMessages) => privateMessages.concat(payload));
      }

    });

    socket.current.on('friend request', (userSocketId, roomId) => {
      setRooms((rooms) => rooms.concat(roomId));

      console.log(`new room [${roomId}] initialized with ${userSocketId}`);
    });

    socket.current.on('add private room', (userSocketId, roomId) => {
      setRooms((rooms) => rooms.concat(roomId));
      socket.current?.emit('join room', roomId);
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
          setViewingPrivateMessages={setViewingPrivateMessages}
        />
        <Chat
          socket={socket.current}
          messages={messages}
          setMessages={setMessages}
          privateMessages={privateMessages}
          setPrivateMessages={setPrivateMessages}
          viewingPrivateMessages={viewingPrivateMessages}
          currentRoom={currentRoom}
          socketId={socketId}
        />
      </div>
    );
}

export default App;
