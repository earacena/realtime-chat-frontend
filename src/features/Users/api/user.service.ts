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
  RetrieveUserDetailsParams,
  RetrieveUserContactsParams,
  AddUserParams,
} from "../types/users.types";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`;

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

const addContact = async ({
  userId,
  contactId,
  token
}: AddUserParams) => {

  const response = await fetch(`${baseUrl}/${userId}/contacts`, {
    method: "PUT",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contactId }),
  });

  let responseJson = await response.json();

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
  addContact,
  retrieveUserContacts,
  removeContact,
};
export default userService;
