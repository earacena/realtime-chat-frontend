import React from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { IoIosMail, IoMdSettings } from 'react-icons/io';
import { ContactList } from '../Contacts';
import { Requests } from '../Requests';

function SideBar() {

  return (
    <div className="flex flex-col outline outline-1 h-screen p-1 w-96">
      <div className="flex flex-row justify-evenly">
        <IoIosMail size={30} />
        <BsFillPersonLinesFill  size={30} />
        <IoMdSettings size={30} />

      </div>
      <Requests />
      <ContactList />
    </div>
  );
}

export default SideBar;
