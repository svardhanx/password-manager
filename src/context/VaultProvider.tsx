import { ReactChildren } from "@/types/react-children-type";
import { VaultContextType } from "@/types/vault-context-type";
import encryptionKeyGenerator from "@/utils/encryptionKeyGenerator";
import { useCallback, useState } from "react";
import VaultContext from "./vault-context";

export default function VaultProvider({ children }: ReactChildren) {
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [salt, setSalt] = useState<string>("");

  const unlockVault = useCallback(
    async (masterPassword: string, salt: string) => {
      const key = await encryptionKeyGenerator(masterPassword, salt);
      setEncryptionKey(key);
      setSalt(salt);
      return key;
    },
    []
  );

  const lockVault = useCallback(() => {
    setEncryptionKey(null);
  }, []);

  const value: VaultContextType = {
    encryptionKey,
    salt,
    isUnlocked: encryptionKey !== null,
    lockVault,
    unlockVault,
  };

  return (
    <VaultContext.Provider value={value}>{children}</VaultContext.Provider>
  );
}
