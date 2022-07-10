import React from "react";
import { Popover } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { UserDetails, userService } from "../../Users";
import { resetCurrentRoom, setCurrentRoom } from "../../Rooms";
import { setContacts } from "../../Users";
import { sendContactRefresh } from "../../Chat";

type RenderProps = {
  open: boolean;
};

function ContactOptions() {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.auth.user.id);
  const token = useAppSelector((state) => state.auth.user.token);
  const currentRoom = useAppSelector((state) => state.rooms.currentRoom);
  const contacts = useAppSelector((state) => state.users.contacts);

  const handleContactDelete = async () => {
    try {
      const updatedContacts = await userService.removeContact({
        userId,
        contactId: currentRoom.roomId,
        token,
      });
      let fetchedContacts: UserDetails[] = [];
      if (updatedContacts) {
        for (const id of updatedContacts) {
          fetchedContacts.push(await userService.retrieveUserDetails({ userId: id, token }));
        }
      }
      dispatch(setContacts({ contacts: fetchedContacts }));
      dispatch(sendContactRefresh({ username: currentRoom.roomName }));
      if (!fetchedContacts) {
        dispatch(resetCurrentRoom());
      } else {
        dispatch(
          setCurrentRoom({
            currentRoom: {
              roomId: contacts[0].id,
              roomName: contacts[0].username,
            },
          })
        );
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <Popover className="relative">
      {({ open }: RenderProps) => (
        <>
          <Popover.Button>
            <BsThreeDotsVertical
              className={`${open ? "rotate-90 transform" : ""}`}
            />
          </Popover.Button>

          <Popover.Panel className="absolute z=10 ">
            <div className="flex flex-col justify-center border-2 rounded-xl  p-2 w-36">
              <button
                className="text-red-600 p-2 font-medium rounded-full hover:bg-red-500 hover hover:text-white"
                onClick={handleContactDelete}
              >
                Delete Contact
              </button>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}

export default ContactOptions;
