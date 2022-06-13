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
  },
});

export const {
  setRequests,
} = requestsSlice.actions;

export default requestsSlice.reducer;