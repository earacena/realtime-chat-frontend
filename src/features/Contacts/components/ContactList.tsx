import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import ContactFinderDialog from './ContactFinder';

function ContactList() {
  // const contacts = useAppSelector((state) => state.user.contacts);
  const [isContactFinderOpen, setIsContactFinderOpen] = useState(false);

  const addContactButtonPressed = () => setIsContactFinderOpen(true);

  return (
    <div>
      <ContactFinderDialog isOpen={isContactFinderOpen} setIsOpen={setIsContactFinderOpen} />

      <button 
        id="find-contact-button"
        className="rounded-md p-3 bg-slate-500 text-white w-full mt-3 hover:bg-slate-400"
        type="button"
        aria-label="find"
        onClick={addContactButtonPressed}
      >
        <BsFillPersonPlusFill />
      </button>

      <ul>
      </ul>
    </div>
  );
}

export default ContactList;
