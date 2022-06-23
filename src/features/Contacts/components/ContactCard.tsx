import React from 'react';
import { BsPerson } from 'react-icons/bs';
import { ContactCardProps } from '../types/contact.types';

function ContactCard({ contactDetails }: ContactCardProps) {
  return (
    <div className="flex border border-1 border-l-0 border-r-0 px-20 border-slate-400 p-2">
      <div className="outline outline-1 rounded-full mx-3">
        <BsPerson size={40} className="p-1" />
      </div>
      <p className="self-center grow">
        {contactDetails.name}
      </p>
    </div>
  )
}

export default ContactCard;