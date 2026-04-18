async function encryptionKeyGenerator(
  masterPassword: string,
  salt: string,
): Promise<CryptoKey> {
  const password2BEncrypted = masterPassword;
  const uniqueSalt = salt;

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password2BEncrypted),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(uniqueSalt),
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"],
  );

  return aesKey;
}

export default encryptionKeyGenerator;
