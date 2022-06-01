import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BsPersonPlusFill } from 'react-icons/bs';

type ContactFinderDialogProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

function ContactFinderDialog({isOpen, setIsOpen}: ContactFinderDialogProps) {

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">

        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="flex flex-col w-full max-w-lg rounded bg-white p-5">
            <Dialog.Title className="self-center text-2xl">Add a new contact</Dialog.Title>
            <Dialog.Description className="text-md my-3 self-center">
              Enter the username of contact
            </Dialog.Description>
            
            <input
              id="contact-username-input"
              aria-label="username"
              className="flex-grow bg-slate-200 w-96 rounded p-2 focus:outline-slate-400 mt-4 self-center"
            />
            <button 
              id="contact-request-send-button"
              aria-label="send"
              className="flex self-center rounded-md p-3 bg-slate-500 text-white hover:bg-slate-400 items-center mx-2 mt-10"
            >
              <BsPersonPlusFill size={20} />
              <span className="mx-2">
                Send Contact Request
              </span>
            </button>

          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ContactFinderDialog;
