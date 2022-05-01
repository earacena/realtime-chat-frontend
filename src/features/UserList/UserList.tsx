import React from 'react';
import { Socket } from 'socket.io-client';

interface UserListProps {
  socket: Socket | undefined;
  userSocketIds: string[];
  inPrivateRoom: Set<string>;
  setInPrivateRoom: (value: React.SetStateAction<Set<string>>) => void;
};

function UserList({ socket, userSocketIds, inPrivateRoom, setInPrivateRoom }: UserListProps) {

  const handleFriendRequest = (userId: string) => {
    setInPrivateRoom((inPrivateRoom) => inPrivateRoom.add(userId));
    socket?.emit('private room request', userId);
  };

  return (
    <ul>
      {userSocketIds.map((id, i) => ( 
        <li key={i} className="odd:bg-white even:bg-slate-200">
          { !inPrivateRoom.has(id) && id !== socket?.id && <button type="button" onClick={() => handleFriendRequest(id)}>{id}</button> }
        </li>
      ))}
    </ul>
  );
}

export default UserList;
