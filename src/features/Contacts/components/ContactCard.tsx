import React from "react";
import { BsPerson } from "react-icons/bs";
import { useAppSelector } from "../../../hooks";
import { ContactCardProps } from "../types/contact.types";
import { VscCircleFilled } from "react-icons/vsc";

function ContactCard({ contactDetails }: ContactCardProps) {
  const connectedUsers = useAppSelector((state) => state.users.connectedUsers);

  const isUserOnline =
    undefined !==
    connectedUsers.find((users) => users.id === contactDetails.id);

  return (
    <div className="flex flex-row border border-1 border-l-0 border-t-0 border-r-0 rounded-lg border-slate-400 shadow p-2 items-center dark:bg-slate-700 hover:bg-slate-200 w-72 dark:hover:bg-slate-500">
      <BsPerson
        size={40}
        className="border rounded-full border-gray-400 p-1 mr-3 dark:text-slate-200"
      />
      <p className="ml-3 dark:text-white">{contactDetails.name}</p>
      {isUserOnline && <VscCircleFilled className="text-green-500" />}
      {!isUserOnline && <VscCircleFilled className="text-red-500" />}
    </div>
  );
}

export default ContactCard;
