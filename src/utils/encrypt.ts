async function encryptPassword(text: string, key: CryptoKey): Promise<string> {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
  const data = encoder.encode(text);

  const cipherText = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  const encryptedBytes = new Uint8Array(iv.length + cipherText.byteLength);
  encryptedBytes.set(iv, 0);
  encryptedBytes.set(new Uint8Array(cipherText), iv.length);

  const encryptedPassword = btoa(String.fromCharCode(...encryptedBytes));

  return encryptedPassword;
}

export default encryptPassword;
