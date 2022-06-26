import React from 'react';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { IoIosMail, IoMdSettings } from 'react-icons/io';
import { ContactList } from '../Contacts';
import { Requests } from '../Requests';
import { Tab } from '@headlessui/react';

type TabStyleProps = {
  selected: boolean,
};

function SideBar() {
  return (
    <div className="flex flex-col outline outline-1 h-screen p-1 w-96">
      <Tab.Group>
        <Tab.List className="flex flex-row justify-evenly">
          <Tab className={({ selected }: TabStyleProps) => selected ? "bg-slate-500 text-white rounded-lg p-1" : "bg-slate-100 text-black rounded-lg p-1"}>
            <IoIosMail size={40} />                                                                                                 
          </Tab>                                                                                                                    
          <Tab className={({ selected }: TabStyleProps) => selected ? "bg-slate-500 text-white rounded-lg p-1" : "bg-slate-100 text-black rounded-lg p-1"}>
            <BsFillPersonLinesFill  size={40} />                                                                                    
          </Tab>                                                                                                                    
          <Tab className={({ selected }: TabStyleProps) => selected ? "bg-slate-500 text-white rounded-lg p-1" : "bg-slate-100 text-black rounded-lg p-1"}>
            <IoMdSettings size={40} />
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Requests />
          </Tab.Panel>
          <Tab.Panel>
            <ContactList />
          </Tab.Panel>
          <Tab.Panel>
            <p>Settings coming soon...</p>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default SideBar;
