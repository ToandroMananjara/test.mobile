import { View, Text, TouchableOpacity, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface LogoutButtonProps {
  onLogout: () => Promise<void>;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Déconnexion",
        style: "destructive",
        onPress: async () => {
          try {
            await onLogout();
            console.log("Déconnexion réussie");
          } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            Alert.alert(
              "Erreur",
              "Une erreur est survenue lors de la déconnexion"
            );
          }
        },
      },
    ]);
  };

  return (
    <TouchableOpacity
      className="py-4 rounded-xl bg-destructive dark:bg-destructive-dark shadow-lg mb-4"
      onPress={handleLogout}
    >
      <View className="flex-row items-center justify-center">
        <FontAwesome name="sign-out" size={18} color="white" />
        <Text className="text-white font-bold text-base ml-2">Déconnexion</Text>
      </View>
    </TouchableOpacity>
  );
}
