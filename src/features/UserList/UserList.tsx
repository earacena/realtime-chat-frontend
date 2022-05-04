import React from 'react';
import { SocketType } from '../../app.types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setUserIdsInPrivateRoom } from '../Room';

function UserList() {
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.socket);
  const connectedUserIds = useAppSelector((state) => state.users.connectedUserIds);
  const userIdsInPrivateRoom = useAppSelector((state) => state.rooms.userIdsInPrivateRoom);

  const handleFriendRequest = (userId: string) => {
    const s = SocketType.check(socket);
    dispatch(setUserIdsInPrivateRoom({ usersIdsInPrivateRoom: userIdsInPrivateRoom.add(userId) }));
    s.emit('private room request', userId);
  };

  const isCurrentUserId = (id: string) => {
    const s = SocketType.check(socket);
    return s.id !== id; 
  }

  return (
    <ul>
      {connectedUserIds.map((id, i) => ( 
        <li key={i} className="odd:bg-white even:bg-slate-200">
          { !userIdsInPrivateRoom.has(id) && isCurrentUserId(id) && <button type="button" onClick={() => handleFriendRequest(id)}>{id}</button> }
        </li>
      ))}
    </ul>
  );
}

export default UserList;
