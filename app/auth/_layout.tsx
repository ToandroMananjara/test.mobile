import { Stack } from "expo-router";
import AuthGuard from "@/guards/AuthGuard";

export default function AuthLayout() {
  return (
    <AuthGuard>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </AuthGuard>
  );
}
