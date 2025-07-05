import { View, Text, ActivityIndicator, useColorScheme } from "react-native";

interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({
  message = "Chargement...",
}: LoadingStateProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark">
      <ActivityIndicator size="large" color={isDark ? "#60A5FA" : "#3B82F6"} />
      <Text className="mt-4 text-foreground dark:text-foreground-dark text-base">
        {message}
      </Text>
    </View>
  );
};
