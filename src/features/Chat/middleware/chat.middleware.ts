import { Middleware } from '@reduxjs/toolkit';
import { disconnected, setSocketId, setMessages, sendMessage, addMessage, startConnecting, connectionEstablished } from '../stores/chat.slice';
import { io, Socket } from 'socket.io-client';
import { removeConnectedUserId, setConnectedUserIds } from '../../UserList';
import { addRoom, setUserIdsInPrivateRoom } from '../../Room';
import type { Message, Messages } from '../types/chat.types';

const url = 'http://localhost:3001/';

const chatMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;


    if (startConnecting.match(action)) {
      // Initialize socket connection if appropriate action received
      socket = io(url);
      store.dispatch(setSocketId({ socketId: socket.id }));

      const userConnectionHandler = (userSocketId: string) => {
        store.dispatch(setConnectedUserIds({ userId: userSocketId }));
      };

      const userDisconnectionHandler = (userSocketId: string) => {
        store.dispatch(removeConnectedUserId({ id: userSocketId }));
      };

      const connectedUserListHandler = (allUserSocketIds: string[]) => {
        store.dispatch(setConnectedUserIds({ connectedUserIds: allUserSocketIds }));
      };

      const receiveMessageHandler = (message: Message) => {
        store.dispatch(addMessage({ message }));
      };
      
      const receiveAllMessagesHandler = (messages: Messages) => {
        store.dispatch(setMessages({ messages }));
      };

      const privateRoomRequestHandler = (userSocketId: string, roomId: string) => {
        store.dispatch(addRoom({ room: { roomId, roomName: `chat with ${userSocketId}` } }));
        socket.emit('join room', roomId);
    
        console.log(`new room [${roomId}] initialized with ${userSocketId}`);
        store.dispatch(setUserIdsInPrivateRoom({ userId: userSocketId }));
      };

      const connectionHandler = () => {
        store.dispatch(connectionEstablished());
      };   

      const disconnectionHandler = () => {
        store.dispatch(disconnected());
        console.log("disconnected from socket");
      };

      socket.on('connect', connectionHandler);
      socket.on('user connected', userConnectionHandler);
      socket.on('user disconnected', userDisconnectionHandler); 
      socket.on('all connected users', connectedUserListHandler);
      socket.on('receive message', receiveMessageHandler);
      socket.on('receive all messages', receiveAllMessagesHandler);
      socket.on('private room request', privateRoomRequestHandler); 
      socket.on('disconnect', disconnectionHandler);
    }

    if (sendMessage.match(action) && isConnectionEstablished) {
      socket.emit('send message', action.payload.message);
    }

    next(action);
  }
}

export default chatMiddleware;