import { useState, useEffect } from "react";
import { useSession } from "./useSession";
import { mockUsers } from "../data/users";
import { User } from "@/types/user";

type AuthState = {
  loading: boolean;
  success: boolean;
  error?: string | null;
};

export function useAuthManager() {
  const { data, status, update, clear } = useSession();
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    setAuthState({
      loading: status === "loading",
      success: status === "authenticated",
      error: null,
    });
  }, [status]);

  const signUp = async (data: any) => {
    setAuthState({ loading: true, success: false, error: null });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUser = mockUsers.find((u) => u.email === data.email);
      if (existingUser) {
        setAuthState({
          loading: false,
          success: false,
          error: "Cet email est déjà utilisé",
        });
        return { success: false, message: "Cet email est déjà utilisé" };
      }

      console.log("User signed up with data:", data);

      setAuthState({ loading: false, success: true });
      return { success: true, data: data };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue";
      console.error("Signup error:", error);
      setAuthState({
        loading: false,
        success: false,
        error: "Une erreur est survenue lors de l'inscription",
      });
      return { success: false, error: errorMessage };
    }
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setAuthState({ loading: true, success: false, error: null });

    try {
      const userByEmail = mockUsers.find((user) => user.email === email);

      if (!userByEmail) {
        setAuthState({
          loading: false,
          success: false,
          error: "L'email n'existe pas",
        });
        return { success: false, message: "L'email n'existe pas" };
      }

      if (userByEmail.password !== password) {
        setAuthState({
          loading: false,
          success: false,
          error: "Mot de passe incorrect",
        });
        return { success: false, message: "Mot de passe incorrect" };
      }
      await update(userByEmail);

      setAuthState({ loading: false, success: true, error: null });
      return { success: true, data: userByEmail };
    } catch (error) {
      console.error("Error during signin:", error);
      setAuthState({
        loading: false,
        success: false,
        error: "Une erreur est survenue lors de la connexion",
      });
      return { success: false, message: "Une erreur est survenue" };
    }
  };

  const signOut = async () => {
    try {
      await clear();
      console.log("User signed out");
    } catch (error) {
      console.error("Error during signout:", error);
      throw error; // Relancer l'erreur pour que le caller puisse la gérer
    }
  };

  return {
    user: data?.user || null,
    authState,
    signIn,
    signUp,
    signOut,
  };
}
