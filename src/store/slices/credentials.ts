import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addCredentialModal: { status: false, helperData: null },
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    openAddCredentialModal(state) {
      // state.addCredentialModal.helperData = action?.payload;
      state.addCredentialModal.status = true;
    },
    closeAddCredentialModal(state) {
      state.addCredentialModal.status = false;
      state.addCredentialModal.helperData = null;
    },
  },
});

export const { openAddCredentialModal, closeAddCredentialModal } =
  credentialsSlice.actions;

export default credentialsSlice.reducer;
