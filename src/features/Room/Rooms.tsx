import React from 'react';
import type { Room, Rooms as RoomArray } from '@/app.types';

interface RoomsProps {
  rooms: RoomArray;
  handleRoomChange: (roomId: Room) => void;
}

function Rooms({ rooms, handleRoomChange }: RoomsProps) {
  return (
    <div className="flex flex-col">
      <div className="flex border-b-2">
        <h2 className="mx-auto text-lg">Rooms</h2>
      </div>
      <ul>
        {rooms.map((room, i) => (
          <li key={room.roomId}>
            <button type="button" onClick={() => handleRoomChange(room)}>{room.roomName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
