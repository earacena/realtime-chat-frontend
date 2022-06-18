import React, { useEffect, useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setContacts, userService } from '../../Users';
import { UserDetails } from '../../Users/types/users.types';
import ContactRequestDialog from './ContactRequestDialog';

function ContactList() {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.auth.user.id);
  const contacts = useAppSelector((state) => state.users.contacts);
  const [isContactFinderOpen, setIsContactFinderOpen] = useState(false);


  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContactIds = await userService.retrieveUserContacts(userId);
        
        // Since fetchedContacts is a list of ids, a list of userDetails must be generated
        let fetchedContacts: UserDetails[] = [];
        for (const id of fetchedContactIds) {
          fetchedContacts.push(await userService.retrieveUserDetails(id));
        }

        dispatch(setContacts({ contacts: fetchedContacts }));
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchContacts();
  }, [dispatch, userId]);


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
        {contacts.map((c) => c.username)}
      </ul>
    </div>
  );
}

export default ContactList;
