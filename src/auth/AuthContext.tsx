import { createContext, useContext } from "react";

export type AuthCtx = {
  isAuthed: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthCtx | null>(null);

export const useAuth = () => {
  const v = useContext(AuthContext);
  if (!v) throw new Error("useAuth must be inside AuthProvider");
  return v;
}
