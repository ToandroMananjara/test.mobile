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
    console.log("=== AuthGuard useEffect triggered ===");
    console.log("status:", status);
    console.log("user:", user);
    console.log("segments:", segments);

    if (status === "loading") {
      console.log("Still loading, waiting...");
      return;
    }

    const inAuthGroup = segments[0] === "auth";
    const isAuthenticated = status === "authenticated" && user;

    if (hasNavigated) {
      console.log("Already navigated, skipping...");
      return;
    }

    if (isAuthenticated && inAuthGroup) {
      setHasNavigated(true);
      router.replace("/(tabs)");
      setTimeout(() => setHasNavigated(false), 1000);
    } else if (!isAuthenticated && !inAuthGroup) {
      setHasNavigated(true);
      router.replace("/auth/login");
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
