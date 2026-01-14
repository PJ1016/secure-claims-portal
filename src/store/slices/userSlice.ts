import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AccountInfo } from "@azure/msal-browser";

export interface UserState {
  user: AccountInfo | null;
  isAuthenticated: boolean;
}

export const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AccountInfo>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
