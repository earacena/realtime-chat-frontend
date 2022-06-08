import React, { useEffect, useState } from 'react';
import { userService } from '../../Users';
import { UserDetails } from '../../Users/types/users.types';
import { Request } from '../types/requests.types';

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

  return (
    <div className="border rounded">
      {`${userDetails?.name} ${requestMessage}`}
    </div>
  );
}

export default RequestCard;