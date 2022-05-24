import React from 'react';
import { setCurrentRoom } from '.';
import { useAppDispatch, useAppSelector } from '../../hooks';

function Rooms() {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.rooms.allRooms);
  
  return (
    <div className="flex flex-col">
      <div className="flex border-b-2">
        <h2 className="mx-auto text-lg">Rooms</h2>
      </div>
      <ul>
        {rooms.map((room, i) => (
          <li key={room.roomId}>
            <button type="button" onClick={() => dispatch(setCurrentRoom({ currentRoom: room }))}>{room.roomName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rooms;
