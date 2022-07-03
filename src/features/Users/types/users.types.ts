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

export type CreateUserFields = {
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

export type MakeUserContactsProps = {
  user1: number,
  user2: number,
};

export type ContactsPayload = {
  contacts: UserDetails[],
};
