import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RequestsState, RequestsPayload } from "../types/requests.types";

const initialState: RequestsState = {
  requests: []
};

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests: (state: RequestsState, action: PayloadAction<RequestsPayload>) => ({
      ...state,
      requests: action.payload.requests,
    }),
    resetRequests: (state: RequestsState) => ({
      ...state,
      requests: initialState.requests,
    }),
  },
});

export const {
  setRequests,
  resetRequests,
} = requestsSlice.actions;

export default requestsSlice.reducer;