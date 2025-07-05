import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState = ({
  title = "Erreur",
  message,
  onRetry,
  retryText = "Réessayer",
}: ErrorStateProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark px-6">
      <FontAwesome
        name="exclamation-triangle"
        size={64}
        color={isDark ? "#b91c1c" : "#ef4444"}
      />
      <Text className="mt-6 text-destructive dark:text-destructive-dark text-xl font-semibold text-center">
        {title}
      </Text>
      <Text className="mt-3 text-base text-center text-foreground dark:text-foreground-dark opacity-70">
        {message}
      </Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="mt-6 bg-primary dark:bg-primary-dark px-8 py-4 rounded-lg shadow-lg"
        >
          <Text className="text-white font-semibold text-base">
            {retryText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
