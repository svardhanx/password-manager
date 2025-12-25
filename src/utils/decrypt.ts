async function decryptPassword(
  cipher: string,
  key: CryptoKey
): Promise<string> {
  const encryptedBytes = Uint8Array.from(atob(cipher), (c) => c.charCodeAt(0));

  const iv = encryptedBytes.slice(0, 12); // First 12 bytes
  const cipherText = encryptedBytes.slice(12); // Rest = cipherText

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    cipherText
  );

  const decoder = new TextDecoder();
  const decryptPassword = decoder.decode(decrypted);

  return decryptPassword;
}
export default decryptPassword;
