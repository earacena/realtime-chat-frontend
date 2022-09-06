import {
  RequestArray,
  RequestResponse,
  CreateParams,
  GetRequestsOfUserParams,
  UpdateParams,
} from "../types/requests.types";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/requests`;

const create = async ({ request, token }: CreateParams) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  } else {
    return RequestResponse.check(responseJson);
  }
};

const getRequestsOfUser = async ({
  userId,
  token,
}: GetRequestsOfUserParams) => {
  const response = await fetch(`${baseUrl}/pending/to/${userId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const requests = RequestArray.check(await response.json());
  return requests;
};

const update = async ({ updatedRequest, token }: UpdateParams) => {
  const response = await fetch(`${baseUrl}/${updatedRequest.id}`, {
    method: "PUT",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedRequest),
  });

  const responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  } else {
    return RequestResponse.check(responseJson);
  }
};

const requestService = { create, getRequestsOfUser, update };
export default requestService;
