import { View, Text } from "react-native";
import { ProfileAvatar } from "./ProfileAvatar";
import { User } from "@/types/user.type";

interface ProfileHeaderProps {
  user: User | null;
  onImageUpdate: (imageUri: string) => Promise<void>;
}

export function ProfileHeader({ user, onImageUpdate }: ProfileHeaderProps) {
  return (
    <View className="relative">
      <View className="pt-12 pb-16 bg-gradient-to-br from-primary to-brand-secondary dark:from-primary-dark dark:to-brand-secondary">
        {/* Decorative elements */}
        <View className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-16 translate-x-16" />
        <View className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-12 -translate-x-12" />

        <View className="items-center relative z-10">
          <ProfileAvatar user={user} onImageUpdate={onImageUpdate} />

          <View className="items-center space-y-2">
            <Text className="text-white text-2xl font-bold tracking-wide drop-shadow-lg">
              {user?.lastName} {user?.firstName}
            </Text>
            <Text className="text-white/80 text-base font-medium">
              {user?.email}
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
  );
}
