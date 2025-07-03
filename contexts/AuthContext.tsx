import React, { createContext, useContext, ReactNode } from "react";
import { User } from "@/types/user";
import { useAuthManager } from "@/hooks/useAuthManager";

type AuthState = {
  loading: boolean;
  success: boolean;
  error?: string | null;
};

export type AuthContextType = {
  user: User | null;
  authState: AuthState;
  signIn: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;

  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, authState, signIn, signOut } = useAuthManager();

  return (
    <AuthContext.Provider value={{ user, authState, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
