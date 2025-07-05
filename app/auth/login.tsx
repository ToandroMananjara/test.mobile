import LoginScreen from "@/components/auth/LoginScreen";
import { Stack } from "expo-router";

export default function LoginPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoginScreen />;
    </>
  );
}
