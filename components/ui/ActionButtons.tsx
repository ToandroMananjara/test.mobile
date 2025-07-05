import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface ActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
  loading?: boolean;
  cancelText?: string;
  saveText?: string;
  loadingText?: string;
}

export const ActionButtons = ({
  onCancel,
  onSave,
  loading = false,
  cancelText = "Annuler",
  saveText = "Sauvegarder",
  loadingText = "Sauvegarde...",
}: ActionButtonsProps) => {
  return (
    <View className="flex-row mt-8">
      <TouchableOpacity
        className="flex-1 bg-muted dark:bg-muted-dark py-3 rounded-lg mr-2"
        onPress={onCancel}
        disabled={loading}
      >
        <Text className="text-muted-foreground dark:text-muted-foreground-dark font-semibold text-center">
          {cancelText}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`flex-1 bg-primary dark:bg-primary-dark py-3 rounded-lg ml-2 ${
          loading ? "opacity-50" : ""
        }`}
        onPress={onSave}
        disabled={loading}
      >
        {loading ? (
          <View className="flex-row items-center justify-center">
            <ActivityIndicator color="#fff" size="small" />
            <Text className="text-white font-semibold ml-2">{loadingText}</Text>
          </View>
        ) : (
          <Text className="text-white font-semibold text-center">
            {saveText}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
