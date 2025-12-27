export type VaultContextType = {
  encryptionKey: CryptoKey | null;
  isUnlocked: boolean;
  unlockVault: (masterPassword: string, salt?: string) => Promise<void>;
  lockVault: () => void;
};
