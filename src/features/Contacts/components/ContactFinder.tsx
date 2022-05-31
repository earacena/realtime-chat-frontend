import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';

type ContactFinderDialogProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function ContactFinderDialog({isOpen, setIsOpen}: ContactFinderDialogProps) {

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <Dialog.Title>Find a User</Dialog.Title>
        <Dialog.Description>
          Use the search feature to send another use a contact request
        </Dialog.Description>


      </Dialog.Panel>
    </Dialog>
  );
}

export default ContactFinderDialog;
