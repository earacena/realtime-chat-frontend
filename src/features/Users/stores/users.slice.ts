import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersState, ConnectedUserIdsPayload, UserIdPayload, ContactsPayload } from '../types/users.types';

const initialState: UsersState = {
  connectedUserIds: [],
  userIdsInPrivateRoom: [],
  contacts: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setConnectedUserIds: (state: UsersState, action: PayloadAction<ConnectedUserIdsPayload>) => ({
      ...state,
      connectedUserIds: action.payload.connectedUserIds,
    }),
    addConnectedUserId: (state: UsersState, action: PayloadAction<UserIdPayload>) => ({
      ...state,
      connectedUserIds: state.connectedUserIds.concat(action.payload.userId),
    }),
    removeConnectedUserId: (state: UsersState, action: PayloadAction<UserIdPayload>) => ({
      ...state,
      connectedUserIds: state.connectedUserIds.filter((id) => id !== action.payload.userId),
    }),
    addUserIdToPrivateRoom: (state: UsersState, action: PayloadAction<UserIdPayload>) => ({
      ...state,
      userIdsInPrivateRoom: state.userIdsInPrivateRoom.concat(action.payload.userId),
    }),
    resetConnectedUserIds: (state: UsersState) => ({
      ...state,
      connectedUserIds: initialState.connectedUserIds,
    }),
    requestPrivateRoomWithUser: (state: UsersState, action: PayloadAction<UserIdPayload>) => { return; },
    setContacts: (state: UsersState, action: PayloadAction<ContactsPayload>) => ({
      ...state,
      contacts: action.payload.contacts,
    }),
    resetContacts: (state: UsersState) => ({
      ...state,
      contacts: initialState.contacts,
    }),
  }
});

export const {
  setConnectedUserIds,
  addConnectedUserId,
  removeConnectedUserId,
  addUserIdToPrivateRoom,
  resetConnectedUserIds,
  requestPrivateRoomWithUser,
} = usersSlice.actions;

export default usersSlice.reducer;