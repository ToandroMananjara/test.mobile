import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export const PageHeader = ({
  title,
  onBack,
  showBackButton = true,
}: PageHeaderProps) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-background dark:bg-background-dark border-b border-border dark:border-border-dark"
    >
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center flex-1">
          {showBackButton && (
            <TouchableOpacity onPress={handleBack} className="p-2 mr-2">
              <FontAwesome
                name="arrow-left"
                size={20}
                color={isDark ? "#60A5FA" : "#3B82F6"}
              />
            </TouchableOpacity>
          )}
          <Text className="text-lg font-bold text-foreground dark:text-foreground-dark flex-1">
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
};
