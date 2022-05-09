import React from 'react';
import { addConnectedUserId, requestPrivateRoomWithUser } from '.';
import { useAppDispatch, useAppSelector } from '../../hooks';

function UserList() {
  const dispatch = useAppDispatch();
  const socketId = useAppSelector((state) => state.chat.socketId);
  const connectedUserIds = useAppSelector((state) => state.users.connectedUserIds);
  const userIdsInPrivateRoom = useAppSelector((state) => state.rooms.userIdsInPrivateRoom);

  const handleFriendRequest = (userId: string) => {
    dispatch(requestPrivateRoomWithUser({ userId }));
    dispatch(addConnectedUserId({ userId }));
  };

  const isCurrentUserId = (id: string) => socketId !== id;

  return (
    <ul>
      {connectedUserIds.map((id, i) => ( 
        <li key={i} className="odd:bg-white even:bg-slate-200">
          { !userIdsInPrivateRoom.includes(id) && isCurrentUserId(id) && <button type="button" onClick={() => handleFriendRequest(id)}>{id}</button> }
        </li>
      ))}
    </ul>
  );
}

export default UserList;
