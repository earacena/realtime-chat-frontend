import React from 'react';
import { UserList } from '../../features/Users/';
import { Rooms } from '../../features/Rooms/';

function SideBar() {
  return (
    <div className="outline outline-1 h-screen p-1 w-96">
      <UserList />
      <Rooms />
    </div>
  );
}

export default SideBar;
