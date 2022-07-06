import React, { useEffect } from 'react';
import { BsPerson } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { ContactCardProps } from '../types/contact.types';
import { VscCircleFilled } from 'react-icons/vsc';
import { signalOnline } from '../../Chat';

function ContactCard({ contactDetails }: ContactCardProps) {
  const dispatch = useAppDispatch();
  const connectedUsers = useAppSelector((state) => state.users.connectedUsers);

  const isUserOnline = undefined !== connectedUsers.find((users) => users.id === contactDetails.id);

  return (
    <div className="flex flex-row border border-1 border-l-0 border-t-0 border-r-0 rounded-lg border-slate-400 shadow p-2 items-center hover:bg-slate-200 w-72">
      <BsPerson size={40} className="border rounded-full border-gray-400 p-1 mr-3" />
      <p className="ml-3">
        {contactDetails.name}
      </p>
      { isUserOnline && <VscCircleFilled className="text-green-500" /> }
      { !isUserOnline && <VscCircleFilled className="text-red-500" /> }
    </div>
  )
}

export default ContactCard;