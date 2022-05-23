export type AuthenticatedUser = {
  id: number;
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
  token: string;
  user: AuthenticatedUser;
};