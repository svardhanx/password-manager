import { VaultContextType } from "@/types/vault-context-type";
import { createContext } from "react";

const VaultContext = createContext<VaultContextType | null>(null);

export default VaultContext;
