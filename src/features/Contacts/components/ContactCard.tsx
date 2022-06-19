import React from 'react';
import { ContactCardProps } from '../types/contact.types';

function ContactCard({ contactDetails }: ContactCardProps) {
  return (
    <div>
      {`${contactDetails.name} (${contactDetails.username})`}
    </div>
  )
}

export default ContactCard;