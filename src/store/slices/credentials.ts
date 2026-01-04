import { CredentialType } from "@/types/password-credentials";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VaultState {
  addCredentialModal: { status: boolean; helperData: null };
  viewPassword: {
    status: boolean;
    helperData: CredentialType | null;
  };
}

const initialState: VaultState = {
  addCredentialModal: { status: false, helperData: null },
  viewPassword: { status: false, helperData: null },
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
    openViewPasswordModal(state, action: PayloadAction<CredentialType | null>) {
      state.viewPassword.helperData = action.payload;
      state.viewPassword.status = true;
    },
    closeViewPasswordModal(state) {
      state.viewPassword.status = false;
      state.viewPassword.helperData = null;
    },
  },
});

export const {
  openAddCredentialModal,
  closeAddCredentialModal,
  openViewPasswordModal,
  closeViewPasswordModal,
} = credentialsSlice.actions;

export default credentialsSlice.reducer;
