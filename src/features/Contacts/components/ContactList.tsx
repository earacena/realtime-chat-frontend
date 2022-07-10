import React, { useEffect, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setContacts, userService } from "../../Users";
import { UserDetails } from "../../Users/types/users.types";
import ContactRequestDialog from "./ContactRequestDialog";
import ContactCard from "./ContactCard";
import { setCurrentRoom } from "../../Rooms";

function ContactList() {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.auth.user.id);
  const token = useAppSelector((state) => state.auth.user.token);
  const contacts = useAppSelector((state) => state.users.contacts);
  const [isContactFinderOpen, setIsContactFinderOpen] = useState(false);
  const isContactsListEmpty = contacts.length === 0;

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const fetchedContactIds = await userService.retrieveUserContacts({
          userId,
          token,
        });

        // Since fetchedContacts is a list of ids, a list of userDetails must be generated
        let fetchedContacts: UserDetails[] = [];
        for (const id of fetchedContactIds) {
          fetchedContacts.push(
            await userService.retrieveUserDetails({ userId: id, token })
          );
        }

        dispatch(setContacts({ contacts: fetchedContacts }));
      } catch (error: unknown) {
        console.error(error);
      }
    };

    if (token && isContactsListEmpty) {
      fetchContacts();
    }
  }, [dispatch, userId, token, isContactsListEmpty]);

  const addContactButtonPressed = () => setIsContactFinderOpen(true);

  const handleContactClick = (id: number, username: string) => {
    dispatch(
      setCurrentRoom({ currentRoom: { roomId: id, roomName: username } })
    );
  };

  return (
    <div className="flex flex-col items-center grow py-4">
      <ContactRequestDialog
        isOpen={isContactFinderOpen}
        setIsOpen={setIsContactFinderOpen}
      />

      <button
        id="find-contact-button"
        className="flex rounded-md p-3 bg-slate-500 text-white w-full mb-3 mt-3 hover:bg-slate-400 items-center justify-center"
        type="button"
        aria-label="find"
        onClick={addContactButtonPressed}
      >
        <BsFillPersonPlusFill size={20} />
        <span className="px-4"> Add Contact </span>
      </button>

      {contacts.length === 0 && <span className="py-5">No added contacts</span>}
      <ul className="flex flex-col justify-center overflow-auto">
        {contacts.map((c) => (
          <button
            key={c.id}
            onClick={() => handleContactClick(c.id, c.username)}
          >
            <ContactCard key={c.id} contactDetails={c} />
          </button>
        ))}
      </ul>
    </div>
  );
}

export default ContactList;
