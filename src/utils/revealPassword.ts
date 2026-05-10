import decryptData from "./decrypt";
// import toast from "react-hot-toast";

async function revealPassword(
  password: string | null | undefined,
  encryptionKey: CryptoKey,
) {
  if (!encryptionKey || !password) {
    throw new Error("Error fetching password.");
    // toast.error("Error fetching password.");
    // return;
  }

  const decryptedData = await decryptData(password, encryptionKey);

  return decryptedData;
}

export default revealPassword;
