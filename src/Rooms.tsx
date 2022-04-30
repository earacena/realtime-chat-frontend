import React from 'react';
import type { Room, Rooms as RoomArray } from './app.types';

interface RoomsProps {
  rooms: RoomArray;
  handleRoomChange: (roomId: Room) => void;
}

function Rooms({ rooms, handleRoomChange }: RoomsProps) {
  return (
    <ul>
      {rooms.map((room, i) => (
        <li key={room.roomId}>
          <button type="button" onClick={() => handleRoomChange(room)}>{room.roomName}</button>
        </li>
      ))}
    </ul>
  );
}

export default Rooms;
