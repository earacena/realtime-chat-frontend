import React from 'react';
import { Popover } from '@headlessui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';

type RenderProps = {
  open: boolean;
};

function ContactOptions() {

  const handleContactDelete = () => {

  };

  return (
    <Popover className="relative">
      {({ open }: RenderProps) => (
        <>
          <Popover.Button>
            <BsThreeDotsVertical className={`${open ? 'rotate-90 transform' : ''}`} />
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