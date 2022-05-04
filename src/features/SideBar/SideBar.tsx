import React from 'react';
import { UserList } from '../../features/UserList/';
import { Rooms } from '../../features/Room/';

function SideBar() {
  return (
    <div className="outline outline-1 h-screen p-1 w-96">
      <UserList />
      <Rooms />
    </div>
  );
}

export default SideBar;
