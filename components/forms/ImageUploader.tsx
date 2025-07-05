import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  useColorScheme,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";

interface ImageUploaderProps {
  image: string | null;
  onImageSelected: (uri: string) => void;
  label?: string;
  placeholder?: string;
}

export const ImageUploader = ({
  image,
  onImageSelected,
  label = "Image du produit",
  placeholder = "Toucher pour ajouter une image",
}: ImageUploaderProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const selectImage = async () => {
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
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        onImageSelected(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sélectionner une image");
    }
  };

  return (
    <View className="mb-6">
      <Text className="text-sm font-medium text-foreground dark:text-foreground-dark mb-2">
        {label}
      </Text>
      <TouchableOpacity
        onPress={selectImage}
        className="h-48 bg-muted dark:bg-muted-dark border-2 border-dashed border-border dark:border-border-dark rounded-lg items-center justify-center"
      >
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="items-center">
            <FontAwesome
              name="camera"
              size={32}
              color={isDark ? "#6B7280" : "#9CA3AF"}
            />
            <Text className="text-muted-foreground dark:text-muted-foreground-dark mt-2">
              {placeholder}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
