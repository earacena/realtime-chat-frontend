import React from 'react';
import { ContactList } from '../Contacts';
import Requests from '../Requests';

function SideBar() {
  return (
    <div className="outline outline-1 h-screen p-1 w-96">
      <Requests />
      <ContactList />
    </div>
  );
}

export default SideBar;
