import {
  Number as RtNumber,
  String as RtString,
  Union as RtUnion,
  InstanceOf as RtInstanceOf,
  Record as RtRecord,
  Array as RtArray,
  Static as RtStatic,
} from 'runtypes';

export interface UsersState {
  connectedUserIds: string[];
  userIdsInPrivateRoom: string[];
};

export interface CreateUserFields {
  name: string;
  username: string;
  password: string;
};

export type ConnectedUserIdsPayload = {
  connectedUserIds: string[],
};

export type UserIdPayload = {
  userId: string;
};

export const UserDetailsType = RtRecord({
  id: RtNumber,
  name: RtString,
  username: RtString,
});

export type UserDetails = RtStatic<typeof UserDetailsType>;