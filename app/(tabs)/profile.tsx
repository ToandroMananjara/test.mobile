import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { Stack } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { PageHeader } from "@/components/ui";
import {
  ProfileHeader,
  ProfileActions,
  ProfileForm,
  LogoutButton,
} from "@/components/profile";
import {
  AccountUpdateSchema,
  AccountUpdateSchemaValues,
} from "@/schemas/account.schema";

export default function ProfileTabScreen() {
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

  const handleImageUpdate = async (imageUri: string) => {
    await updateProfile({ profileImage: imageUri });
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
          <ProfileHeader user={user} onImageUpdate={handleImageUpdate} />

          <View className="px-4 -mt-4">
            <View className="flex-row justify-end mb-6">
              <ProfileActions
                isEditing={isEditing}
                isLoading={profileState.loading}
                onEdit={handleEdit}
                onSave={handleSubmit(handleSave)}
                onCancel={handleCancel}
              />
            </View>

            <ProfileForm
              control={control}
              errors={errors}
              isEditing={isEditing}
            />

            <LogoutButton onLogout={signOut} />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
