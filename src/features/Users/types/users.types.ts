import {
  Number as RtNumber,
  String as RtString,
  Record as RtRecord,
  Static as RtStatic,
} from 'runtypes';

export type UserDetails = RtStatic<typeof UserDetailsType>;

export type UsersState = {
  connectedUsers: OnlineUserInfo[];
  userIdsInPrivateRoom: string[];
  contacts: UserDetails[];
};

export type CreateUserParams = {
  name: string;
  username: string;
  password: string;
};

export type OnlineUserInfo = {
  id: number;
  username: string;
}

export type ConnectedUsersPayload = {
  connectedUsers: OnlineUserInfo[],
};

export type OnlineUserInfoPayload = {
  id: number;
  username: string;
};

export type UserIdPayload = {
  id: number;
};

export const UserDetailsType = RtRecord({
  id: RtNumber,
  name: RtString,
  username: RtString,
});

export type MakeUserContactsParams = {
  user1: number,
  user2: number,
  token: string,
};

export type ContactsPayload = {
  contacts: UserDetails[],
};

export type RemoveContactParams = {
  userId: number,
  contactId: number,
  token: string
};

export type RetrieveUserDetailsParams = {
  userId: number,
  token: string,
};

export type RetrieveUserContactsParams = {
  userId: number,
  token: string,
};