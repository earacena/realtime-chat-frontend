import {
  String as RtString,
  Number as RtNumber,
  Record as RtRecord,
} from 'runtypes';

export type AuthenticatedUser = {
  id: number;
  token: string;
  username: string;
  name: string;
};

export type TokenPayload = {
  token: string;
};

export type AuthenticatedUserPayload = {
  user: AuthenticatedUser;
};

export interface AuthState {
  user: AuthenticatedUser;
};

export const AuthResponse = RtRecord({
  token: RtString,
  id: RtNumber,
  username: RtString,
  name: RtString,
});