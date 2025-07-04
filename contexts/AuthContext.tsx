import React, { createContext, useContext, ReactNode } from "react";
import { User } from "@/types/user";
import { useAuthManager } from "@/hooks/useAuthManager";

export type AuthContextType = {
  user: User | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
  signUp: (userData: any) => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, authState, signIn, signUp, signOut } = useAuthManager();
  const status: "loading" | "authenticated" | "unauthenticated" =
    authState.loading
      ? "loading"
      : authState.success
      ? "authenticated"
      : "unauthenticated";

  return (
    <AuthContext.Provider value={{ user, status, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
