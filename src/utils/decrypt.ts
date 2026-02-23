async function decryptData(cipher: string, key: CryptoKey): Promise<string> {
  try {
    const binaryString = atob(cipher);

    const encryptedBytes = Uint8Array.from(binaryString, (c) =>
      c.charCodeAt(0),
    );

    const iv = encryptedBytes.slice(0, 12); // First 12 bytes

    const cipherText = encryptedBytes.slice(12); // Rest = cipherText

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      cipherText,
    );

    const decoder = new TextDecoder();

    const decryptedPassword = decoder.decode(decryptedBuffer);

    return decryptedPassword;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Decryption error: ", error);
      return error?.message;
    } else {
      return "Error Occurred";
    }
  }
}
export default decryptData;
