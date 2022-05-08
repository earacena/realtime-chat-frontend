import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
  connectedUserIds: string[];
};

const initialState: UsersState = {
  connectedUserIds: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setConnectedUserIds: (state, action) => ({
      ...state,
      connectedUserIds: action.payload.connectedUserIds,
    }),
    addConnectedUserId: (state, action) => ({
      ...state,
      connectedUserIds: state.connectedUserIds.concat(action.payload.userId),
    }),
    removeConnectedUserId: (state, action) => ({
      ...state,
      connectedUserIds: state.connectedUserIds.filter((id) => id !== action.payload.id),
    }),
    resetConnectedUserIds: (state, action) => ({
      ...state,
      connectedUserIds: initialState.connectedUserIds,
    }),
    requestPrivateRoomWithUser: (state, action) => { return; },
  }
});

export const {
  setConnectedUserIds,
  addConnectedUserId,
  removeConnectedUserId,
  resetConnectedUserIds,
  requestPrivateRoomWithUser,
} = usersSlice.actions;

export default usersSlice.reducer;