import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ClaimsState {
  claims: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ClaimsState = {
  claims: [],
  loading: false,
  error: null,
};

export const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setClaims: (state, action: PayloadAction<any[]>) => {
      state.claims = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addClaim: (state, action: PayloadAction<any>) => {
      state.claims.push(action.payload);
    },
  },
});

export const { setLoading, setClaims, setError, addClaim } =
  claimsSlice.actions;

export default claimsSlice.reducer;
