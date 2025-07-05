import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ProfileActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileActions({
  isEditing,
  isLoading,
  onEdit,
  onSave,
  onCancel,
}: ProfileActionsProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  if (isEditing) {
    return (
      <View className="flex-row gap-4">
        <TouchableOpacity
          className="px-6 py-3 rounded-xl bg-muted dark:bg-muted-dark border border-border dark:border-border-dark shadow-sm"
          onPress={onCancel}
          disabled={isLoading}
        >
          <View className="flex-row items-center">
            <FontAwesome
              name="times"
              size={16}
              color={isDark ? "#cbd5e1" : "#475569"}
            />
            <Text className="font-semibold ml-2 text-foreground dark:text-foreground-dark">
              Annuler
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className={`px-6 py-3 rounded-xl bg-green-500 dark:bg-green-600 shadow-lg ${
            isLoading ? "opacity-50" : ""
          }`}
          onPress={onSave}
          disabled={isLoading}
        >
          <View className="flex-row items-center">
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <FontAwesome name="check" size={16} color="white" />
            )}
            <Text className="text-white font-semibold ml-2">
              {isLoading ? "Sauvegarde..." : "Sauvegarder"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      className="px-6 py-3 rounded-xl bg-primary dark:bg-primary-dark shadow-lg"
      onPress={onEdit}
    >
      <View className="flex-row items-center">
        <FontAwesome name="edit" size={16} color="white" />
        <Text className="text-white font-semibold ml-2">Modifier</Text>
      </View>
    </TouchableOpacity>
  );
}
