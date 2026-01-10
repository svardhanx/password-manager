import { CredentialType } from "@/types/password-credentials";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface credentialModalHelperData {
  mode: "create" | "edit";
  data: CredentialType | null;
}

interface VaultState {
  credentialModal: {
    status: boolean;
    helperData: credentialModalHelperData | null;
  };
  viewPassword: {
    status: boolean;
    helperData: CredentialType | null;
  };
}

const initialState: VaultState = {
  credentialModal: { status: false, helperData: null },
  viewPassword: { status: false, helperData: null },
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    openCredentialModal(
      state,
      action: PayloadAction<credentialModalHelperData | null>
    ) {
      state.credentialModal.helperData = action?.payload;
      state.credentialModal.status = true;
    },
    closeCredentialModal(state) {
      state.credentialModal.status = false;
      state.credentialModal.helperData = null;
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
  openCredentialModal,
  closeCredentialModal,
  openViewPasswordModal,
  closeViewPasswordModal,
} = credentialsSlice.actions;

export default credentialsSlice.reducer;
