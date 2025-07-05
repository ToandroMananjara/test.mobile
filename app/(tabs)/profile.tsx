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
import { Stack, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { ControlledInput, ControlledTextarea } from "@/components/forms";
import { PageHeader } from "@/components/ui";
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
  const insets = useSafeAreaInsets();

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
        console.log("Image mise à jour avec succès", JSON.stringify(user));
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
      <View
        className="flex-1 justify-center items-center bg-background dark:bg-background-dark"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <ActivityIndicator
          size="large"
          color={isDark ? "#60A5FA" : "#3B82F6"}
        />
        <Text className="mt-4 text-lg text-foreground dark:text-foreground-dark">
          Chargement du profil...
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        className="flex-1 bg-background dark:bg-background-dark"
        style={{ paddingTop: insets.top }}
      >
        <PageHeader title="Profil" showBackButton={false} />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingBottom: Math.max(20, insets.bottom),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="relative">
            <View
              className="pt-12 pb-16 bg-gradient-to-br from-primary to-brand-secondary dark:from-primary-dark dark:to-brand-secondary"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #60a5fa 0%, #8b5cf6 100%)"
                  : "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
              }}
            >
              <View className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-16 translate-x-16" />
              <View className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-12 -translate-x-12" />

              <View className="items-center relative z-10">
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

                <View className="items-center space-y-2">
                  <Text className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">
                    `${user?.firstName} ${user?.lastName}`
                  </Text>
                  <Text className="text-white/80 text-base font-medium">
                    user?.email
                  </Text>
                </View>
              </View>
            </View>

            <View
              className="absolute bottom-0 left-0 right-0 h-8 bg-background dark:bg-background-dark"
              style={{
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}
            />
          </View>

          <View className="px-4 -mt-4">
            <View className="flex-row justify-end mb-6">
              {isEditing ? (
                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    className="px-6 py-3 rounded-xl bg-muted dark:bg-muted-dark border border-border dark:border-border-dark shadow-sm"
                    onPress={handleCancel}
                    disabled={profileState.loading}
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
                      profileState.loading ? "opacity-50" : ""
                    }`}
                    onPress={handleSubmit(handleSave)}
                    disabled={profileState.loading}
                  >
                    <View className="flex-row items-center">
                      {profileState.loading ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <FontAwesome name="check" size={16} color="white" />
                      )}
                      <Text className="text-white font-semibold ml-2">
                        {profileState.loading ? "Sauvegarde..." : "Sauvegarder"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  className="px-6 py-3 rounded-xl bg-primary dark:bg-primary-dark shadow-lg"
                  onPress={handleEdit}
                >
                  <View className="flex-row items-center">
                    <FontAwesome name="edit" size={16} color="white" />
                    <Text className="text-white font-semibold ml-2">
                      Modifier
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View className="rounded-2xl p-6 mb-6 shadow-sm bg-card dark:bg-card-dark border border-border dark:border-border-dark">
              <Text className="text-xl font-bold mb-6 text-foreground dark:text-foreground-dark">
                Informations personnelles
              </Text>

              <ControlledInput
                control={control}
                name="lastName"
                label="Nom"
                placeholder="Entrez votre nom"
                editable={isEditing}
                error={errors.lastName?.message}
              />

              <ControlledInput
                control={control}
                name="firstName"
                label="Prénom"
                placeholder="Entrez votre prénom"
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
              className="py-4 rounded-xl bg-destructive dark:bg-destructive-dark shadow-lg mb-4"
              onPress={handleLogout}
            >
              <View className="flex-row items-center justify-center">
                <FontAwesome name="sign-out" size={18} color="white" />
                <Text className="text-white font-bold text-base ml-2">
                  Déconnexion
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
