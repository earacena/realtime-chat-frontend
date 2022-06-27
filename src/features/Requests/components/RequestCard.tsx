import React, { useEffect, useState } from 'react';
import { userService } from '../../Users';
import { UserDetails } from '../../Users/types/users.types';
import { Request } from '../types/requests.types';
import { IoMdCheckmark } from 'react-icons/io';
import { MdOutlineCancel } from 'react-icons/md';
import requestService from '../api/request.service';
import { setRequests } from '../stores/request.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { BsFillPersonPlusFill, BsPerson } from 'react-icons/bs';

type RequestCardProps = {
  request: Request,
};

function RequestCard({ request }: RequestCardProps) {
  const dispatch = useAppDispatch();
  const requests = useAppSelector((state) => state.requests.requests);
  const user = useAppSelector((state) => state.auth.user);
  const [userDetails, setUserDetails] = useState<UserDetails>();

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
  }, [request.fromUser])

  const handleRequest = async (newStatus: string) => {
    try {
      await requestService.update({ ...request, status: newStatus });
      
      // If request was a contact request and user accepts it, update both users profile
      if (userDetails && request.type === 'contact' && newStatus === 'accepted') {
        await userService.makeUsersContacts({ user1: user.id, user2: userDetails.id });
      }

      // Since request was handled, remove it from the feed
      dispatch(setRequests({ requests: requests.filter((r) => r.id !== request.id) }));

    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-grow flex-row border rounded items-center mt-7 p-2">
      <BsPerson size={40} />
      <span className="text-lg font-medium">{userDetails?.name}</span>
      <button onClick={() => handleRequest('accepted')}>
        <IoMdCheckmark size={30} className="text-green-600 ml-14" />
      </button>
      <button onClick={() => handleRequest('rejected')}>
        <MdOutlineCancel size={30} className="text-red-800 ml-3" />
      </button>
    
    </div>
  );
}

export default RequestCard;