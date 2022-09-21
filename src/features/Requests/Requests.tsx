import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setRequests } from "./stores/request.slice";
import requestService from "./api/request.service";
import RequestCard from "./components/RequestCard";

function Requests() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user.id);
  const token = useAppSelector((state) => state.auth.user.token);
  const requests = useAppSelector((state) => state.requests.requests);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const fetchedRequests = await requestService.getRequestsOfUser({
          userId,
          token,
        });
        dispatch(setRequests({ requests: fetchedRequests }));
      } catch (error: unknown) {
        console.error(error);
      }
    };

    fetchRequests();
  }, [dispatch, userId, token]);

  return (
    <div className="flex justify-center">
      {requests.length === 0 && (
        <span className="py-10 dark:text-white">No pending requests</span>
      )}
      <ul className="overflow-auto">
        {requests.map((r) => (
          <RequestCard key={r.id} request={r} />
        ))}
      </ul>
    </div>
  );
}

export default Requests;
