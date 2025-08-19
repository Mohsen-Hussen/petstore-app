import { createContext, useContext } from "react";
import type { AuthCtx } from "../types/pets";

export const AuthContext = createContext<AuthCtx | null>(null);

export const useAuth = () => {
  const v = useContext(AuthContext);
  if (!v) throw new Error("useAuth must be inside AuthProvider");
  return v;
}
