export type VaultContextType = {
  encryptionKey: CryptoKey | null;
  salt: string;
  isUnlocked: boolean;
  unlockVault: (masterPassword: string, salt: string) => Promise<CryptoKey>;
  lockVault: () => void;
};
