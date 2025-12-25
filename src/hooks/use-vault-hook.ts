import VaultContext from "@/context/vault-context";
import { useContext } from "react";

export default function useVault() {
  const vaultContext = useContext(VaultContext);

  if (!vaultContext)
    throw new Error("useVault must be used inside VaultProvider");

  return vaultContext;
}
