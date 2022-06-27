import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { ContactCardProps } from '../types/contact.types';

function ContactCard({ contactDetails }: ContactCardProps) {
  return (
    <div className="flex flex-row border border-1 border-l-0 border-t-0 border-r-0 border-slate-400 p-2 w-72">
      <BsPerson size={40} className="border rounded-full border-gray-400 p-1 mr-3" />
      <p className="ml-3">
        {contactDetails.name}
      </p>
    </div>
  )
}

export default ContactCard;