import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  encryptionKey: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setEncryptionKey(state, action) {
      state.encryptionKey = action.payload;
    },
  },
});

export const { setEncryptionKey } = commonSlice.actions;

export default commonSlice.reducer;
