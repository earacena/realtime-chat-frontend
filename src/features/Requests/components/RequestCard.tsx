import React, { useEffect, useState } from 'react';
import { userService } from '../../Users';
import { UserDetails } from '../../Users/types/users.types';
import { Request } from '../types/requests.types';
import { IoMdCheckmark } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import requestService from '../api/request.service';
import { setRequests } from '../stores/request.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

type RequestCardProps = {
  request: Request,
};

function RequestCard({ request }: RequestCardProps) {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((state) => state.requests.requests);
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
  }, [])

  const handleRequest = async (newStatus: string) => {
    try {
      await requestService.update({ ...request, status: newStatus });

      // Since request was handled, remove it from the feed
      dispatch(setRequests({ requests: requests.filter((r) => r.id !== request.id) }));
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded">
      {`${userDetails?.name} ${requestMessage}`}
      <button onClick={() => handleRequest('accepted')}>
        <IoMdCheckmark />
      </button>
      <button onClick={() => handleRequest('rejected')}>
        <MdOutlineCancel />
      </button>
    
    </div>
  );
}

export default RequestCard;