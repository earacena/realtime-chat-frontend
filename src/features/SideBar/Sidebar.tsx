import React from 'react';
import { Socket } from 'socket.io-client';
import UserList from '@/features/UserList/UserList';
import type { Room, Rooms as RoomArray } from '@/app.types';
import Rooms from '@/features/Room/Rooms';

interface SideBarProps {
  socket: Socket | undefined;
  userSocketIds: string[];
  rooms: RoomArray;
  setCurrentRoom: (value: React.SetStateAction<Room>) => void;
  inPrivateRoom: Set<string>;
  setInPrivateRoom: (value: React.SetStateAction<Set<string>>) => void;
};

function SideBar({ socket, userSocketIds, rooms, setCurrentRoom, inPrivateRoom, setInPrivateRoom }: SideBarProps) {

  const handleRoomChange = (room: Room) => {
    setCurrentRoom(room);
    console.log(`Now talking in room ${room.roomId}`);
  };

  return (
    <div className="outline outline-1 h-screen p-1 w-96">
      <UserList socket={socket} userSocketIds={userSocketIds} inPrivateRoom={inPrivateRoom} setInPrivateRoom={setInPrivateRoom} />
      <Rooms rooms={rooms} handleRoomChange={handleRoomChange}/>
    </div>
  );
}

export default SideBar;