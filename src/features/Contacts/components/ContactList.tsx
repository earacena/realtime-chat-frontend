import React from 'react';
import { useAppSelector } from '../../../hooks';

function ContactList() {
  const contacts = useAppSelector((state) => state.user.contacts);

  return (
    <ul>
      {contacts.map((contact) => contact.name)}
    </ul>
  );
}

export default ContactList;
