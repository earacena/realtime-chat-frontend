import React from 'react';
import { addConnectedUserId, addUserIdToPrivateRoom, requestPrivateRoomWithUser } from '.';
import { useAppDispatch, useAppSelector } from '../../hooks';

function UserList() {
  const dispatch = useAppDispatch();
  const socketId = useAppSelector((state) => state.chat.socketId);
  const connectedUserIds = useAppSelector((state) => state.users.connectedUserIds);
  const userIdsInPrivateRoom = useAppSelector((state) => state.rooms.userIdsInPrivateRoom);

  const handleFriendRequest = (userId: string) => {
    dispatch(requestPrivateRoomWithUser({ userId }));
    dispatch(addConnectedUserId({ userId }));
    dispatch(addUserIdToPrivateRoom({ userId }));
  };

  const isCurrentUserId = (id: string) => socketId === id;
  const privateRoomExists = (id: string) => {
    if (userIdsInPrivateRoom) {
      return userIdsInPrivateRoom.includes(id);
    }
  }

  if (!connectedUserIds) {
    return null;
  }

  

  return (
    <ul>
      {connectedUserIds.map((id, i) => ( 
        <li key={i} className="odd:bg-white even:bg-slate-200">
          { !privateRoomExists(id) && !isCurrentUserId(id) && <button type="button" onClick={() => handleFriendRequest(id)}>{id}</button> }
        </li>
      ))}
    </ul>
  );
}

export default UserList;
