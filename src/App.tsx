import React, { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { Message }  from './app.types';
import { Chat } from './features/Chat';
import { SideBar } from './features/SideBar';
import { setSocket } from './features/Socket';
import { setConnectedUserIds } from './features/UserList';
import { useAppDispatch, useAppSelector } from './hooks';


function App() {
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.socket);
  const messages = useAppSelector((state) => state.messages);
  const rooms = useAppSelector((state) => state.rooms);

  const userConnectionHandler = (userSocketId: string) => {
    dispatch(setConnectedUserIds({ userId: userSocketId }));
  };

  const userDisconnectionHandler = (payload) => {
    const { userSocketId } = payload;
    setUserSocketIds((userSocketIds) => userSocketIds.filter((id) => id !== userSocketId));
  };

  const connectedUserListHandler = (payload) => {
    const { allUserSocketIds } = payload;
    setUserSocketIds(allUserSocketIds);
  };

  const messageHandler = (payload) => {
    const { userSocketId, roomId, message } = payload;
    if (socket.current) {
      const payload: Message = {
        senderId: userSocketId,
        roomId,
        message,
      };
      setMessages((messages) => messages.concat(payload));
    }
  };

  const privateRoomRequestHandler = (payload) => {
    const { userSocketId, roomId } = payload;
    setRooms((rooms) => rooms.concat({ roomId, roomName: `chat with ${userSocketId}` }));
    socket.current?.emit('join room', roomId);

    console.log(`new room [${roomId}] initialized with ${userSocketId}`);
    setInPrivateRoom((inPrivateRoom) => inPrivateRoom.add(userSocketId));
  };

  const connectionHandler = () => {
    if (socket.current) {
      setSocketId(socket.current.id);
    }
  };

  const disconnectionHandler = (payload) => {
    console.log("disconnected from socket");
  };

  useEffect(() => {
    // Initialize socket connection
    dispatch(setSocket({ socket: io('ws://localhost:3001') }));
    socket.on('connect', connectionHandler);

    // Eveing
    socket.on('user connected', userConnectionHandler);
    socket.on('user disconnected', userDisconnectionHandler); 
    socket.on('all connected users', connectedUserListHandler);
    socket.on('message', messageHandler);
    socket.on('private room request', privateRoomRequestHandler); 
    socket.on('disconnect', disconnectionHandler);

    return () => { socket.current?.disconnect(); };
  }, []);

  return (
    <div className="flex flex-row">
      <SideBar
        socket={socket.current}
        userSocketIds={userSocketIds}
        rooms={rooms}
        setCurrentRoom={setCurrentRoom}
        inPrivateRoom={inPrivateRoom}
        setInPrivateRoom={setInPrivateRoom}
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
