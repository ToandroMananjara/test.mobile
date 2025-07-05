import RegisterScreen from "@/components/auth/RegisterScreen";
import { Stack } from "expo-router";

export default function RegisterPage() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <RegisterScreen />;
    </>
  );
}
