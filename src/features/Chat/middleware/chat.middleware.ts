import { Middleware } from "@reduxjs/toolkit";
import {
  disconnected,
  setSocketId,
  setMessages,
  sendMessage,
  addMessage,
  startConnecting,
  connectionEstablished,
  sendRequestRefresh,
  sendContactRequest,
  sendContactRefresh,
  signalOnline,
  signalOffline,
  signalOnlineReply,
} from "../stores/chat.slice";
import { io, Socket } from "socket.io-client";
import { String as RtString } from "runtypes";
import {
  addConnectedUser,
  removeConnectedUser,
  setContacts,
  UserDetails,
  userService,
} from "../../Users";
import chatEventType from "../types/chatEvents.types";
import { requestService, setRequests } from "../../Requests";

const url = "http://localhost:3001/";

const chatMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    const isConnectionEstablished = socket && store.getState().chat.isConnected;
    const token = store.getState().auth.user.token;
    const userId = store.getState().auth.user.id;

    if (startConnecting.match(action) && token) {
      // Initialize socket connection if appropriate action received
      socket = io(url, { auth: { token }, multiplex: false });

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

      const connectionHandler = () => {
        store.dispatch(connectionEstablished());
        store.dispatch(setSocketId({ socketId: socket.id }));
      };

      const disconnectionHandler = () => {
        store.dispatch(disconnected());
        console.log("disconnected from socket");
      };

      const requestRefreshHandler = async () => {
        try {
          const fetchedRequests = await requestService.getRequestsOfUser({ userId, token });
          store.dispatch(setRequests({ requests: fetchedRequests }));
        } catch (error: unknown) {
          console.error(error);
        }
      };
      
      const contactRefreshHandler = async () => {
        try {
          const fetchedContactIds = await userService.retrieveUserContacts({ userId, token });
          // Since fetchedContacts is a list of ids, a list of userDetails must be generated
          let fetchedContacts: UserDetails[] = [];
          for (const id of fetchedContactIds) {
            fetchedContacts.push(await userService.retrieveUserDetails({ userId: id, token }));
          }

          store.dispatch(setContacts({ contacts: fetchedContacts }));
        } catch (error: unknown) {
          console.error(error);
        }
      };

      const contactRequestHandler = async (payloadJSON: unknown) => {
        try {
          const payload: unknown = JSON.parse(RtString.check(payloadJSON));
          const { fromUser } = chatEventType.ContactRequestPayload.check(payload);
          
          await userService.addContact({ userId, contactId: fromUser.id, token });

        } catch (error) {
          console.error(error);
        }
      }

      const signalOnlineHandler = (payloadJSON: unknown) => {
        const payload: unknown = JSON.parse(RtString.check(payloadJSON));
        const { id, username } = chatEventType.SignalOnlinePayload.check(payload);
        store.dispatch(addConnectedUser({ id, username }));
        store.dispatch(signalOnlineReply({ id, username }));
      };

      const signalOfflineHandler = (payloadJSON: unknown) => {
        const payload: unknown = JSON.parse(RtString.check(payloadJSON));
        const { id } = chatEventType.SignalOfflinePayload.check(payload);
        store.dispatch(removeConnectedUser({ id }));
      };
      
      const signalOnlineReplyHandler = (payloadJSON: unknown) => {
        const payload: unknown = JSON.parse(RtString.check(payloadJSON));
        const { id, username } = chatEventType.SignalOnlinePayload.check(payload);
        console.log(`${id}, ${username}`)
        store.dispatch(addConnectedUser({ id, username }));
      };


      socket.on('connect', connectionHandler);
      socket.on('receive message', receiveMessageHandler);
      socket.on('receive all room messages', receiveAllMessagesHandler);
      socket.on('request refresh', requestRefreshHandler);
      socket.on('contact request', contactRequestHandler);
      socket.on('contact refresh', contactRefreshHandler);
      socket.on('signal online', signalOnlineHandler);
      socket.on('signal offline', signalOfflineHandler);
      socket.on('signal online reply', signalOnlineReplyHandler);
      socket.on('disconnect', disconnectionHandler);
    }

    if (sendMessage.match(action) && isConnectionEstablished) {
      const messagePayload: string = JSON.stringify({
        message: action.payload.newMessage,
      });
      socket.emit("send message", messagePayload);
    }

    if (sendRequestRefresh.match(action) && isConnectionEstablished) {
      const requestRefreshPayload = JSON.stringify({
        username: action.payload.username,
      });
      socket.emit("request refresh", requestRefreshPayload);
    }

    if (sendContactRequest.match(action) && isConnectionEstablished) {
      const contactRequestPayload = JSON.stringify({
        toUser: action.payload.toUser,
        fromUser: action.payload.fromUser,
      });
      socket.emit("contact request", contactRequestPayload);
    }

    if (sendContactRefresh.match(action) && isConnectionEstablished) {
      const contactRefreshPayload = JSON.stringify({
        username: action.payload.username,
      });
      socket.emit("contact refresh", contactRefreshPayload);
    }

    if (signalOnline.match(action) && isConnectionEstablished) {
      socket.emit("signal online");
    }
    
    if (signalOffline.match(action) && isConnectionEstablished) {
      socket.emit("signal offline");
    }
    
    if (signalOnlineReply.match(action) && isConnectionEstablished) {
      const { id, username } = action.payload;
      const SignalOnlinePayload = JSON.stringify({ id, username });
      socket.emit("signal online reply", SignalOnlinePayload);
    }

    next(action);
  };
};

export default chatMiddleware;
