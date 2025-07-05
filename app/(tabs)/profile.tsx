import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  useColorScheme,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { ControlledInput, ControlledTextarea } from "@/components/forms";
import {
  AccountUpdateSchema,
  AccountUpdateSchemaValues,
} from "@/schemas/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ProfileTabScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { profile, profileState, updateProfile } = useProfile();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<AccountUpdateSchemaValues>({
    resolver: zodResolver(AccountUpdateSchema),
    defaultValues: {
      ...user,
    },
  });

  const handleSave = async (data: AccountUpdateSchemaValues) => {
    const result = await updateProfile(data);
    if (result.success) {
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

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
        await updateProfile({ profileImage: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sélectionner une image");
    }
  };

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
            await signOut();
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

  if (profileState.loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark">
        <ActivityIndicator
          size="large"
          color={isDark ? "#60A5FA" : "#3B82F6"}
        />
        <Text className="mt-4 text-lg text-muted-foreground dark:text-muted-foreground-dark">
          Chargement du profil...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background dark:bg-background-dark">
      <View className="pt-12 pb-8 bg-primary dark:bg-primary-dark">
        <View className="items-center">
          <View className="relative mb-4">
            <TouchableOpacity
              className="w-24 h-24 rounded-full items-center justify-center bg-card dark:bg-card-dark overflow-hidden"
              onPress={handleImagePicker}
            >
              {user?.profileImage ? (
                <Image
                  source={{ uri: user.profileImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <FontAwesome
                  name="user"
                  size={40}
                  color={isDark ? "#60A5FA" : "#3B82F6"}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary dark:bg-primary-dark border-2 border-white items-center justify-center"
              onPress={handleImagePicker}
            >
              <FontAwesome name="camera" size={12} color="white" />
            </TouchableOpacity>
          </View>
          <Text className="text-white text-xl font-bold">
            {user ? `${user?.firstName} ${user?.lastName}` : "Jean Dupont"}
          </Text>
          <Text className="text-sm text-primary-foreground/70 dark:text-primary-foreground-dark/70">
            {user?.email || "jean.dupont@email.com"}
          </Text>
        </View>
      </View>

      <View className="p-4">
        <View className="flex-row justify-end mb-4">
          {isEditing ? (
            <View className="flex-row">
              <TouchableOpacity
                className="px-4 py-2 rounded-lg mr-2 bg-muted dark:bg-muted-dark border border-border dark:border-border-dark"
                onPress={handleCancel}
                disabled={profileState.loading}
              >
                <View className="flex-row items-center">
                  <FontAwesome
                    name="times"
                    size={14}
                    color={isDark ? "#E5E7EB" : "#374151"}
                  />
                  <Text className="font-medium ml-2 text-muted-foreground dark:text-muted-foreground-dark">
                    Annuler
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className={`px-4 py-2 rounded-lg bg-success dark:bg-success-dark ${
                  profileState.loading ? "opacity-50" : ""
                }`}
                onPress={handleSubmit(handleSave)}
                disabled={profileState.loading}
              >
                <View className="flex-row items-center">
                  {profileState.loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <FontAwesome name="check" size={14} color="white" />
                  )}
                  <Text className="text-white font-medium ml-2">
                    {profileState.loading ? "Sauvegarde..." : "Sauvegarder"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              className="px-4 py-2 rounded-lg bg-primary dark:bg-primary-dark"
              onPress={handleEdit}
            >
              <View className="flex-row items-center">
                <FontAwesome name="edit" size={14} color="white" />
                <Text className="text-white font-medium ml-2">Modifier</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View className="rounded-lg p-4 mb-4 shadow-sm bg-card dark:bg-card-dark border border-border dark:border-border-dark">
          <Text className="text-lg font-semibold mb-4 text-foreground dark:text-foreground-dark">
            Informations personnelles
          </Text>

          <ControlledInput
            control={control}
            name="lastName"
            label="Nom"
            placeholder="Entrez votre nom "
            editable={isEditing}
            error={errors.lastName?.message}
          />

          <ControlledInput
            control={control}
            name="firstName"
            label="Prenom"
            placeholder="Entrez votre prenom "
            editable={isEditing}
            error={errors.firstName?.message}
          />
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            placeholder="Entrez votre email"
            keyboardType="email-address"
            editable={isEditing}
            error={errors.email?.message}
          />

          <ControlledInput
            control={control}
            name="phone"
            label="Téléphone"
            placeholder="Entrez votre numéro de téléphone"
            keyboardType="phone-pad"
            editable={isEditing}
            error={errors.phone?.message}
          />

          <ControlledTextarea
            control={control}
            name="address"
            label="Adresse"
            placeholder="Entrez votre adresse complète"
            editable={isEditing}
            error={errors.address?.message}
            numberOfLines={3}
          />
        </View>

        <TouchableOpacity
          className="py-4 rounded-lg bg-destructive dark:bg-destructive-dark"
          onPress={handleLogout}
        >
          <View className="flex-row items-center justify-center">
            <FontAwesome name="sign-out" size={18} color="white" />
            <Text className="text-white font-semibold text-base ml-2">
              Déconnexion
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
