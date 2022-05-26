import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, TokenPayload, AuthenticatedUserPayload } from '../types/auth.types';


const initialState: AuthState = {
  user: {
    token: '',
    id: 0,
    username: '',
    name: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthState, action: PayloadAction<TokenPayload>) => ({ ...state, token: action.payload.token }),
    setAuthenticatedUser: (state: AuthState, action: PayloadAction<AuthenticatedUserPayload>) => ({ ...state, user: action.payload.user }),
  }
});

export const {
  setToken,
  setAuthenticatedUser,
} = authSlice.actions;

export default authSlice.reducer;
