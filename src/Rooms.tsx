import React from 'react';

interface RoomsProps {
  rooms: string[];
  handleRoomChange: (roomId: string) => void;
}

function Rooms({ rooms, handleRoomChange }: RoomsProps) {
  return (
    <ul>
      {rooms.map((room, i) => (
        <li key={i}>
          <button type="button" onClick={() => handleRoomChange(room)}>{room}</button>
        </li>
      ))}
    </ul>
  );
}

export default Rooms;
