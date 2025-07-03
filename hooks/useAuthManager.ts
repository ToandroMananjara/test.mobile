import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockUsers } from "../data/users";
import { User } from "@/types/user";
type AuthState = {
  loading: boolean;
  success: boolean;
  error?: string | null;
};
export function useAuthManager() {
  const [user, setUser] = useState<User | null>(null);
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    success: false,
    error: null,
  });
  const signUp = async (data: any) => {
    setAuthState({ loading: true, success: false, error: null });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
    const userByEmail = mockUsers.find((user) => user.email === email);

    try {
      setAuthState({ loading: true, success: false, error: null });
      if (!userByEmail) {
        return { success: false, message: "L'email n'existe pas" };
      }

      if (userByEmail.password !== password) {
        return { success: false, message: "Mot de passe incorrect" };
      }

      await AsyncStorage.setItem("user", JSON.stringify(userByEmail));
      setUser(userByEmail);
      setAuthState({ loading: false, success: true, error: null });

      return { success: true };
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
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  const loadUser = async () => {
    console.log("load user");

    setAuthState({ loading: true, success: false, error: null });
    try {
      const stored = await AsyncStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }

      // Simulate a delay for loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAuthState({ loading: false, success: true, error: null });
    } catch (error) {
      console.error("Error loading user:", error);
      setAuthState({
        loading: false,
        success: false,
        error: "Une erreur est survenue lors du chargement de l'utilisateur",
      });

      return;
    } finally {
      setAuthState({ loading: false, success: true, error: null });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return {
    user,
    authState,
    signIn,
    signUp,
    signOut,
  };
}
