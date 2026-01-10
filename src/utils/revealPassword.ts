import { CredentialType } from "@/types/password-credentials";
import decryptData from "./decrypt";
import toast from "react-hot-toast";

async function revealPassword(
  helperData: CredentialType,
  encryptionKey: CryptoKey
) {
  if (!helperData) {
    toast.error("Error fetching password.");
    return;
  }

  if (!encryptionKey || !helperData?.password) {
    toast.error("Error fetching password.");
    return;
  }

  const decryptedData = await decryptData(helperData.password, encryptionKey);

  return decryptedData;
}

export default revealPassword;
