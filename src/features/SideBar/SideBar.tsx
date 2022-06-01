import React from 'react';
import { ContactList } from '../Contacts';

function SideBar() {
  return (
    <div className="outline outline-1 h-screen p-1 w-96">
      <ContactList />
    </div>
  );
}

export default SideBar;
