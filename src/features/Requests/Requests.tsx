import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import requestService from './api/request.service';
import { Requests as RequestArray } from './types/requests.types';

function Requests() {
  const userId = useAppSelector((state) => state.auth.user.id);
  const [requests, setRequests] = useState<RequestArray>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const fetchedRequests = await requestService.getRequestsOfUser(userId);
        setRequests(fetchedRequests);
  
      } catch (error: unknown) {
        console.error(error);
      }
    }

    fetchRequests();
  }, [userId]);

  return (
    <div>
      <span className="text-xl">Requests</span>
      <ul>
        {requests.map((r) => r.id)}
      </ul>
    </div>
  );
}

export default Requests;