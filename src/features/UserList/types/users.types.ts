export interface UsersState {
  connectedUserIds: string[];
  userIdsInPrivateRoom: string[];
};

export type ConnectedUserIdsPayload = {
  connectedUserIds: string[],
};

export type UserIdPayload = {
  userId: string;
};
