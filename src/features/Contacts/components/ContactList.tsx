import React, { useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import ContactRequestDialog from './ContactRequestDialog';

function ContactList() {
  // const contacts = useAppSelector((state) => state.user.contacts);
  const [isContactFinderOpen, setIsContactFinderOpen] = useState(false);

  const addContactButtonPressed = () => setIsContactFinderOpen(true);

  return (
    <div>
      <ContactRequestDialog isOpen={isContactFinderOpen} setIsOpen={setIsContactFinderOpen} />

      <button 
        id="find-contact-button"
        className="flex rounded-md p-3 bg-slate-500 text-white w-full mt-3 hover:bg-slate-400 items-center"
        type="button"
        aria-label="find"
        onClick={addContactButtonPressed}
      >
        <BsFillPersonPlusFill size={20} className="mx-2"/>
        <span className="mx-7"> Add Contact </span>
      </button>

      <ul>
      </ul>
    </div>
  );
}

export default ContactList;
