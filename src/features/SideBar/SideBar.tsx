import React from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { IoIosMail, IoMdSettings } from 'react-icons/io';
import { ImExit } from 'react-icons/im';
import { ContactList } from '../Contacts';
import { Requests, resetRequests } from '../Requests';
import { Tab } from '@headlessui/react';
import { UserCard, Settings } from './components';
import { useAppDispatch } from '../../hooks';
import { clearAuthenticatedUser } from '../Login';
import { disconnected, resetMessages, resetSocketId, signalOffline } from '../Chat';
import { resetConnectedUsers, resetContacts } from '../Users';
import { resetAllRooms, resetCurrentRoom } from '../Rooms';

type TabStyleProps = {
  selected: boolean,
};

function SideBar() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(clearAuthenticatedUser());
    dispatch(resetConnectedUsers());
    dispatch(resetContacts());
    dispatch(signalOffline());
    dispatch(resetAllRooms());
    dispatch(resetCurrentRoom());
    dispatch(resetRequests());
    dispatch(resetMessages());
    dispatch(resetSocketId());
    dispatch(disconnected());

    window.localStorage.removeItem('chatAppUser');
  };

  const tabStyle = "bg-slate-100 text-black rounded-lg p-1 hover:bg-slate-300 dark:bg-slate-600";
  const selectedTabStyle = "bg-slate-500 dark:bg-slate-400 text-white rounded-lg p-1";
  const iconStyle = "dark:text-white";

  return (
    <div className="flex flex-col h-screen p-1 w-96 border-r-2 dark:bg-slate-800 dark:border-slate-600">
      <button className="flex flex-row self-end text-red-500" onClick={handleLogout}>
        <ImExit size={28} />
        Logout
      </button>
      <UserCard />
      <Tab.Group>
        <Tab.List className="flex flex-row justify-evenly">
          <Tab className={({ selected }: TabStyleProps) => selected ? selectedTabStyle : tabStyle}>
            <BsFillPersonLinesFill className={iconStyle} size={40} />                                         
          </Tab>                                                                         
          <Tab className={({ selected }: TabStyleProps) => selected ? selectedTabStyle : tabStyle}>
            <IoIosMail className={iconStyle} size={40} />                                                      
          </Tab>                                                                         
          <Tab className={({ selected }: TabStyleProps) => selected ? selectedTabStyle : tabStyle}>
            <IoMdSettings className={iconStyle} size={40} />
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ContactList />
          </Tab.Panel>
          <Tab.Panel>
            <Requests />
          </Tab.Panel>
          <Tab.Panel>
            <Settings />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default SideBar;
