import { useAuth } from "@/contexts/AuthContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View, ActivityIndicator } from "react-native";

const PUBLIC_ROUTES = ["login", "register"];
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, authState } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [canRender, setCanRender] = useState(false);

  const currentRoute = useMemo(() => {
    if (!Array.isArray(segments) || !segments[0]) return "/";
    return segments[segments.length - 1];
  }, [segments]);

  const isPublicRoute = ["login", "register"].includes(currentRoute);

  useEffect(() => {
    if (authState.loading) return;

    if (!user && !isPublicRoute) {
      if (currentRoute !== "login") router.replace("/login");
      setCanRender(false);
      return;
    }

    if (user && isPublicRoute) {
      if (currentRoute !== "/") router.replace("/");
      setCanRender(false);
      return;
    }

    setCanRender(true);
  }, [user, authState.loading, currentRoute, isPublicRoute, router]);

  if (authState.loading || !canRender) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return <>{children}</>;
}
