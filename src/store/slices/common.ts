import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  password: "",
  encryptionKey: null,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setPassword(state, action) {
      state.password = action.payload;
    },
    clearPassword(state) {
      state.password = "";
    },
    setEncryptionKey(state, action) {
      state.encryptionKey = action.payload;
    },
  },
});

export const { setEncryptionKey, setPassword, clearPassword } =
  commonSlice.actions;

export default commonSlice.reducer;
