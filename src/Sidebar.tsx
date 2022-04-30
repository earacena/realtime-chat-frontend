import React from 'react';
import { Socket } from 'socket.io-client';
import UserList from './UserList';
import type { Room, Rooms as RoomArray } from './app.types';
import Rooms from './Rooms';

interface SideBarProps {
  socket: Socket | undefined;
  userSocketIds: string[];
  rooms: RoomArray;
  setCurrentRoom: (value: React.SetStateAction<Room>) => void;
};

function SideBar({ socket, userSocketIds, rooms, setCurrentRoom }: SideBarProps) {

  const handleRoomChange = (room: Room) => {
    setCurrentRoom(room);
    console.log(`Now talking in room ${room.roomId}`);
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
