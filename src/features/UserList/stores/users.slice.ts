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
    resetConnectedUserIds: (state, action) => ({
      ...state,
      connectedUserIds: initialState.connectedUserIds,
    })
  }
});

export const {
  setConnectedUserIds,
  addConnectedUserId,
  resetConnectedUserIds,
} = usersSlice.actions;

export default usersSlice.reducer;