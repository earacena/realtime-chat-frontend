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

export const UserType = RtRecord({
  id: RtNumber,
  name: RtString,
  username: RtString,
  passwordHash: RtString,
  dateRegistered: RtUnion(
    RtInstanceOf(Date),
    RtString.withConstraint((x: string) => (x || x !== null || typeof x === 'string' || !Number.isNaN(Date.parse(x)))),
  ),
});

export const UserTypeArray = RtArray(UserType);
