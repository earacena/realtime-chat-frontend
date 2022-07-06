import {
  Array as RtArray,
  Number as RtNumber,
  Record as RtRecord,
} from 'runtypes';

import { RemoveContactProps, CreateUserFields, UserDetailsType, MakeUserContactsProps } from '../types/users.types';

const baseUrl = 'http://localhost:3001/api/users';

const create = async ({ name, username, password }: CreateUserFields) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, username, password }),
  });

  const responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`)
  }
};

const retrieveUserDetails = async (userId: number) => {
  const response = await fetch(`${baseUrl}/details/${userId}`);
  const userDetails = UserDetailsType.check(await response.json());
  return userDetails;
};

const makeUsersContacts = async ({ user1, user2 }: MakeUserContactsProps) => {
  let response = await fetch(`${baseUrl}/${user1}/contacts`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contactId: user2 }),
  });

  let responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  }

  response = await fetch(`${baseUrl}/${user2}/contacts`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contactId: user1 }),
  });
  
  responseJson = await response.json();

  if (responseJson.error) {
    throw new Error(`${responseJson.error}`);
  }
};

const retrieveUserContacts = async (userId: number) => {
  const response = await fetch(`${baseUrl}/${userId}/contacts`);
  const { contacts } = RtRecord({ contacts: RtArray(RtNumber) }).check(await response.json());
  return contacts;
};

const removeContact = async ({ userId, contactId }: RemoveContactProps) => {
  const response = await fetch(`${baseUrl}/${userId}/contacts`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contactId })
  });
  const { contacts } = RtRecord({ contacts: RtArray(RtNumber) }).check(await response.json());
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
