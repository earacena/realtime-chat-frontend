import { AnyAction } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { emitMessage } from './features/Socket';
import store, { RootState } from './store';

interface WrapDispatchProps {
  dispatch: typeof store.dispatch;
}

const createSocketMiddleware = (url: string) => {
  return ({ dispatch }: WrapDispatchProps) => {
    let socket = io(url);

    return (next) => (action: AnyAction) => {
      if (action.type === 'socket/emitPayload') {
        const { eventName, message } = action.payload;
        socket.emit(eventName, message);
        return;
      }

      return next(action);
    }
  }
}