import {
  Array as RtArray,
  Number as RtNumber,
  Record as RtRecord,
  Optional as RtOptional,
} from "runtypes";

import {
  RemoveContactParams,
  CreateUserParams,
  UserDetailsType,
  MakeUserContactsParams,
  RetrieveUserDetailsParams,
  RetrieveUserContactsParams,
} from "../types/users.types";

const baseUrl = "http://localhost:3001/api/users";

const create = async ({
  name,
  username,
  password,
}: CreateUserParams) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, username, password }),
  });

  const responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  }
};

const retrieveUserDetails = async ({
  userId,
  token,
}: RetrieveUserDetailsParams) => {
  const response = await fetch(`${baseUrl}/details/${userId}`, {
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const userDetails = UserDetailsType.check(await response.json());
  return userDetails;
};

const makeUsersContacts = async ({
  user1,
  user2,
  token,
}: MakeUserContactsParams) => {
  let response = await fetch(`${baseUrl}/${user1}/contacts`, {
    method: "PUT",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contactId: user2 }),
  });

  let responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  }

  response = await fetch(`${baseUrl}/${user2}/contacts`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contactId: user1 }),
  });

  responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  }
};

const retrieveUserContacts = async ({
  userId,
  token,
}: RetrieveUserContactsParams) => {
  const response = await fetch(`${baseUrl}/${userId}/contacts`, {
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const { contacts } = RtRecord({ contacts: RtArray(RtNumber) }).check(
    await response.json()
  );
  return contacts;
};

const removeContact = async ({
  userId,
  contactId,
  token,
}: RemoveContactParams) => {
  const response = await fetch(`${baseUrl}/${userId}/contacts`, {
    method: "DELETE",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contactId }),
  });
  const { contacts } = RtRecord({
    contacts: RtOptional(RtArray(RtNumber)),
  }).check(await response.json());
  return contacts;
};

const userService = {
  create,
  retrieveUserDetails,
  makeUsersContacts,
  retrieveUserContacts,
  removeContact,
};
export default userService;
