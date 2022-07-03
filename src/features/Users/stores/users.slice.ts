import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsersState, ConnectedUsersPayload, UserIdPayload, OnlineUserInfoPayload, ContactsPayload } from '../types/users.types';

const initialState: UsersState = {
  connectedUsers: [],
  userIdsInPrivateRoom: [],
  contacts: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setConnectedUserIds: (state: UsersState, action: PayloadAction<ConnectedUsersPayload>) => ({
      ...state,
      connectedUserIds: action.payload.connectedUsers,
    }),
    addConnectedUserId: (state: UsersState, action: PayloadAction<OnlineUserInfoPayload>) => ({
      ...state,
      connectedUserIds: state.connectedUsers.concat({ id: action.payload.id, username: action.payload.username }),
    }),
    removeConnectedUserId: (state: UsersState, action: PayloadAction<UserIdPayload>) => ({
      ...state,
      connectedUserIds: state.connectedUsers.filter((user) => user.id !== action.payload.id),
    }),
    resetConnectedUserIds: (state: UsersState) => ({
      ...state,
      connectedUserIds: initialState.connectedUsers,
    }),
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
  resetConnectedUserIds,
  setContacts,
  resetContacts,
} = usersSlice.actions;

export default usersSlice.reducer;