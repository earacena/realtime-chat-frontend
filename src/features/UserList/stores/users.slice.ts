import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
  connectedUserIds: string[];
  userIdsInPrivateRoom: string[];
};

const initialState: UsersState = {
  connectedUserIds: [],
  userIdsInPrivateRoom: [],
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
    addUserIdToPrivateRoom: (state, action) => ({
      ...state,
      userIdsInPrivateRoom: state.userIdsInPrivateRoom.concat(action.payload.userId),
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
  addUserIdToPrivateRoom,
  resetConnectedUserIds,
  requestPrivateRoomWithUser,
} = usersSlice.actions;

export default usersSlice.reducer;