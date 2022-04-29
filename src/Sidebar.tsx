import React from 'react';
import { Socket } from 'socket.io-client';
import UserList from './UserList';
import Rooms from './Rooms';

interface SideBarProps {
  socket: Socket | undefined;
  userSocketIds: string[];
  rooms: string[];
  setCurrentRoom: (value: React.SetStateAction<string>) => void;
  setViewingPrivateMessages: (value: React.SetStateAction<boolean>) => void;
};

function SideBar({ socket, userSocketIds, rooms, setCurrentRoom, setViewingPrivateMessages }: SideBarProps) {

  const handleRoomChange = (roomId: string) => {
    setCurrentRoom(roomId);
    console.log(`Now talking in room ${roomId}`);
    setViewingPrivateMessages(true);
  };

  return (
    <div className="outline outline-1 h-screen p-1 min-w-fit">
      <UserList socket={socket} userSocketIds={userSocketIds} />
      <span className="outline">Rooms</span>
      <Rooms rooms={rooms} handleRoomChange={handleRoomChange}/>
    </div>
  );
}

export default SideBar;
