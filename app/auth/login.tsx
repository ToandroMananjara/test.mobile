import { Stack } from "expo-router";
import LoginScreen from "@/components/auth/LoginScreen";

export default function LoginPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <LoginScreen />
    </>
  );
}
