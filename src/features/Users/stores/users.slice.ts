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
    setConnectedUsers: (state: UsersState, action: PayloadAction<ConnectedUsersPayload>) => ({
      ...state,
      connectedUsers: action.payload.connectedUsers,
    }),
    addConnectedUser: (state: UsersState, action: PayloadAction<OnlineUserInfoPayload>) => {
      if (!state.connectedUsers.some((user) => user.id === action.payload.id)) {
        return {
          ...state,
          connectedUsers: state.connectedUsers.concat({ id: action.payload.id, username: action.payload.username }),
        };
      } else {
        return state;
      }
    }
    ,
    removeConnectedUser: (state: UsersState, action: PayloadAction<UserIdPayload>) => ({
      ...state,
      connectedUsers: state.connectedUsers.filter((user) => user.id !== action.payload.id),
    }),
    resetConnectedUsers: (state: UsersState) => ({
      ...state,
      connectedUsers: initialState.connectedUsers,
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
  setConnectedUsers,
  addConnectedUser,
  removeConnectedUser,
  resetConnectedUsers,
  setContacts,
  resetContacts,
} = usersSlice.actions;

export default usersSlice.reducer;