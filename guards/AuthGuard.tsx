import { useAuth } from "@/contexts/AuthContext";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [hasNavigated, setHasNavigated] = useState(false);

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    const inAuthGroup = segments[0] === "auth";
    const isAuthenticated = status === "authenticated" && user;

    if (hasNavigated) {
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      setHasNavigated(true);
      router.replace("/(tabs)");
      setTimeout(() => setHasNavigated(false), 1000);
    }
  }, [user, status, segments, router, hasNavigated]);

  if (status === "loading") {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return <>{children}</>;
}
