import React, { useEffect, useState } from 'react';
import { userService } from '../../Users';
import { UserDetails } from '../../Users/types/users.types';
import { Request } from '../types/requests.types';
import { IoMdCheckmark } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import requestService from '../api/request.service';

type RequestCardProps = {
  request: Request,
};

function RequestCard({ request }: RequestCardProps) {
  const [userDetails, setUserDetails] = useState<UserDetails>();

  // Determine request card message
  let requestMessage: string = "";
  const requestContactMessage = "wants to contact you";
  
  if (request.type === 'contact') {
    requestMessage = requestContactMessage;
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const fetchedUserDetails = await userService.retrieveUserDetails(request.fromUser);
        setUserDetails(fetchedUserDetails);
      } catch (error: unknown) {
        console.error(error);
      }
    }

    fetchUserDetails();
  })

  const handleRequestAccept = () => {
    try {
      await requestService.update({ id: request.id, status: 'accepted' });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const handleRequestReject = () => {
    try {
      await requestService.update({ id: request.id, status: 'rejected' });
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded">
      {`${userDetails?.name} ${requestMessage}`}
      <button onClick={handleRequestAccept}>
        <IoMdCheckmark />
      </button>
      <button onClick={handleRequestReject}>
        <MdOutlineCancel />
      </button>
    
    </div>
  );
}

export default RequestCard;