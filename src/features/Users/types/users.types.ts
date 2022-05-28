import {
  Number as RtNumber,
  String as RtString,
  Union as RtUnion,
  InstanceOf as RtInstanceOf,
  Record as RtRecord,
  Array as RtArray,
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
