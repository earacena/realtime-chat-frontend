import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LabelErrorMessage } from '../../../components';
import { Dialog, Transition } from '@headlessui/react';
import { BsPersonPlusFill } from 'react-icons/bs';
import { requestService } from '../../Requests';
import { resetNotification, setNotification } from '../../Notification';
import { useAppDispatch, useAppSelector } from '../../../hooks';

type ContactRequestDialogProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

type Input = {
  username: '',
};

type FormData = {
  username: string;
};

function ContactRequestDialog({isOpen, setIsOpen}: ContactRequestDialogProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Input>({
    defaultValues: {
      username: '',
    }
  });

  const onSubmit: SubmitHandler<Input> = async ({ username }: FormData) => {
    try {
      await requestService.create({
        type: 'contact',
        fromUserId: user.id,
        toUser: username,
      });

      
      const message = `Sent ${username} a contact request.`;

      const newTimeoutId = setTimeout(() => {
        dispatch(resetNotification());
      }, 4000)
      dispatch(setNotification({ 
        type: 'message',
        message,
        timeoutId: newTimeoutId,
      }))
    } catch (error: unknown) {
      
    }
  };

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
            <Dialog.Title className="self-center text-2xl mb-1">Add a new contact</Dialog.Title>
            <Dialog.Description className="text-md self-center text-slate-600 mb-5">
              Send a contact request to a user
            </Dialog.Description>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="contact-username-input" className="mx-11">Username</label>
              {errors.username && <LabelErrorMessage content="Required" />}
              <input
                id="contact-username-input"
                aria-label="username"
                className="flex-grow bg-slate-200 w-96 rounded p-2 focus:outline-slate-400 mt-4 self-center"
                {...register('username', { required: true })}
              />
              <button 
                id="contact-request-send-button"
                type="submit"
                aria-label="send"
                className="flex self-center rounded-md p-3 w-96 bg-slate-500 text-white hover:bg-slate-400 items-center mx-3 mt-10"
              >
                <span className="flex">
                  <BsPersonPlusFill className="ml-20 mr-2" size={20} />
                  Send Contact Request
                </span>
              </button>
            </form>

          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ContactRequestDialog;
