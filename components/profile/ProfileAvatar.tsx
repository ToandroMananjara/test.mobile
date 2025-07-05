import {
  View,
  TouchableOpacity,
  Image,
  useColorScheme,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

import { User } from "@/types/user.type";

interface ProfileAvatarProps {
  user: User | null;
  onImageUpdate: (imageUri: string) => Promise<void>;
}

export function ProfileAvatar({ user, onImageUpdate }: ProfileAvatarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleImagePicker = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Nous avons besoin de votre permission pour accéder à vos photos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        await onImageUpdate(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sélectionner une image");
    }
  };

  return (
    <View className="relative mb-6">
      <TouchableOpacity
        className="w-28 h-28 rounded-full items-center justify-center bg-white dark:bg-surface-dark overflow-hidden shadow-2xl border-4 border-white/20"
        onPress={handleImagePicker}
        activeOpacity={0.8}
      >
        {user?.profileImage ? (
          <Image
            source={{ uri: user.profileImage }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full items-center justify-center bg-gradient-to-br from-primary/20 to-brand-secondary/20">
            <FontAwesome
              name="user"
              size={48}
              color={isDark ? "#60A5FA" : "#3B82F6"}
            />
          </View>
        )}

        <View className="absolute inset-0 bg-black/20 items-center justify-center opacity-0 active:opacity-100">
          <FontAwesome name="camera" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-brand-accent dark:bg-brand-accent shadow-lg border-3 border-white dark:border-surface-dark items-center justify-center"
        onPress={handleImagePicker}
        activeOpacity={0.8}
      >
        <FontAwesome name="camera" size={14} color="white" />
      </TouchableOpacity>
    </View>
  );
}
