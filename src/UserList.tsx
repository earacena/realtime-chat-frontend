import React from 'react';
import { Socket } from 'socket.io-client';

interface UserListProps {
  socket: Socket | undefined;
  userSocketIds: string[];
}

function UserList({ socket, userSocketIds }: UserListProps) {

  const handleFriendRequest = (userId: string) => {
    socket?.emit('friend request', userId);
  };

  return (
    <ul>
      {userSocketIds.map((id, i) => ( 
        <li key={i} className="odd:bg-white even:bg-slate-200">
          <button type="button" onClick={() => handleFriendRequest(id)}>{id}</button>
        </li>
      ))}
    </ul>
  );
}

export default UserList;
