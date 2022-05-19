import { Middleware } from '@reduxjs/toolkit';
import { disconnected, setSocketId, setMessages, sendMessage, addMessage, startConnecting, connectionEstablished } from '../stores/chat.slice';
import { io, Socket } from 'socket.io-client';
import { addConnectedUserId, addUserIdToPrivateRoom, removeConnectedUserId, requestPrivateRoomWithUser, setConnectedUserIds } from '../../UserList';
import { addRoom } from '../../Room';
import chatEventType from '../types/chatEvents.types';
import { String as RtString } from 'runtypes';


const url = 'http://localhost:3001/';

const chatMiddleware: Middleware = store => {
  let socket: Socket;

  return next => action => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;


    if (startConnecting.match(action)) {
      // Initialize socket connection if appropriate action received
      socket = io(url);

      const userConnectionHandler = (payloadJSON: unknown) => {
        const payload: unknown = JSON.parse(RtString.check(payloadJSON));
        const { userSocketId } = chatEventType.UserConnectedEventPayload.check(payload);
        store.dispatch(addConnectedUserId({ userId: userSocketId }));
      };

      const userDisconnectionHandler = (payloadJSON: unknown) => {
        const payload: unknown = JSON.parse(RtString.check(payloadJSON));
        const { userSocketId } = chatEventType.UserDisconnectedEventPayload.check(payload);
        store.dispatch(removeConnectedUserId({ id: userSocketId }));
      };

      const connectedUserListHandler = (payloadJSON: unknown) => {
        const payload: unknown = JSON.parse(RtString.check(payloadJSON));
        const { allUserSocketIds } = chatEventType.ConnectedUserListPayload.check(payload);
        store.dispatch(setConnectedUserIds({ connectedUserIds: allUserSocketIds }));
      };

      const receiveMessageHandler = (payloadJSON: unknown) => {
        const payload: unknown = JSON.parse(RtString.check(payloadJSON));
        const { message } = chatEventType.MessagePayload.check(payload);
        store.dispatch(addMessage({ message }));
      };
      
      const receiveAllMessagesHandler = (payloadJSON: unknown) => {
        const payload: unknown = JSON.parse(RtString.check(payloadJSON));
        const { messages } = chatEventType.MessagesPayload.check(payload);
        store.dispatch(setMessages({ messages }));
      };

      const privateRoomRequestHandler = (payloadJSON: unknown) => {
        const payload: unknown = JSON.parse(RtString.check(payloadJSON));
        const { userSocketId, roomId } = chatEventType.PrivateRoomRequestPayload.check(payload);

        store.dispatch(addRoom({ room: { roomId, roomName: `chat with ${userSocketId}` } }));

        const joinRoomEventPayload = JSON.stringify({ roomId });
        socket.emit('join room', joinRoomEventPayload);
    
        console.log(`new room [${roomId}] initialized with ${userSocketId}`);
        store.dispatch(addUserIdToPrivateRoom({ userId: userSocketId }));
      };

      const connectionHandler = () => {
        store.dispatch(connectionEstablished());
        store.dispatch(setSocketId({ socketId: socket.id }));
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
      socket.on('receive all room messages', receiveAllMessagesHandler);
      socket.on('private room request', privateRoomRequestHandler); 
      socket.on('disconnect', disconnectionHandler);
    }

    if (sendMessage.match(action) && isConnectionEstablished) {
      socket.emit('send message', action.payload.message);
    }

    if (requestPrivateRoomWithUser.match(action) && isConnectionEstablished) {
      socket.emit('private room request', action.payload.userId)
    }

    next(action);
  }
}

export default chatMiddleware;