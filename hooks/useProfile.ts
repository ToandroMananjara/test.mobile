import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/types/user.type";

type ProfileState = {
  loading: boolean;
  success: boolean;
  error?: string | null;
};

export const useProfile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [profileState, setProfileState] = useState<ProfileState>({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const updateProfile = async (updatedData: Partial<User>) => {
    try {
      setProfileState({ loading: true, success: false, error: null });

      await new Promise((resolve) => setTimeout(resolve, 700));

      if (!profile) {
        setProfileState({
          loading: false,
          success: false,
          error: "Profil non trouvé",
        });
        return { success: false, error: "Profil non trouvé" };
      }

      const updatedProfile = { ...profile, ...updatedData };

      setProfile(updatedProfile);

      if (updateUser) {
        await updateUser(updatedProfile);
      }

      setProfileState({ loading: false, success: true, error: null });
      Alert.alert("Succès", "Profil mis à jour avec succès");

      return { success: true, data: updatedProfile };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de la mise à jour";
      setProfileState({
        loading: false,
        success: false,
        error: errorMessage,
      });
      Alert.alert("Erreur", "Impossible de mettre à jour le profil");
      return { success: false, error: errorMessage };
    }
  };

  return {
    profile,
    profileState,
    updateProfile,
    setProfile,
  };
};
