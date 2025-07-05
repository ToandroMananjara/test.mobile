import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/components/useColorScheme";
import { ControlledInput, ControlledPassword } from "@/components/forms";
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string({ required_error: "Mot de passe requis" })
    .min(1, "Mot de passe requis"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { signIn, status, user } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const result = await signIn(data);
      console.log("Login result:", result);
      if (!result.success) {
        setError("root", {
          message: result.message || "Erreur inconnue",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      className="flex-1 justify-center px-6 bg-background dark:bg-background-dark"
    >
      <View className="items-center mb-10">
        <Text className="text-4xl font-bold text-center mb-3 text-foreground dark:text-foreground-dark">
          Bienvenue
        </Text>
        <Text className="text-lg text-center text-text-secondary dark:text-text-secondary-dark">
          Connecte-toi pour continuer
        </Text>
      </View>

      {errors.root?.message && (
        <View className="flex flex-row justify-center items-center bg-destructive/10 dark:bg-destructive-dark/10 rounded-lg p-4 mb-6 border border-destructive/20 dark:border-destructive-dark/20">
          <Text className="text-destructive dark:text-destructive-dark text-center font-medium text-sm">
            {errors.root.message}
          </Text>
        </View>
      )}

      <View className="space-y-5">
        <ControlledInput
          label="Email"
          control={control}
          name="email"
          placeholder="Entrez votre email"
          error={errors.email?.message}
          autoCapitalize="none"
          keyboardType="email-address"
          inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark focus:border-primary dark:focus:border-primary-dark"
        />

        <ControlledPassword
          label="Mot de passe"
          control={control}
          name="password"
          placeholder="Entrez votre mot de passe"
          error={errors.password?.message}
          inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark focus:border-primary dark:focus:border-primary-dark"
        />

        <TouchableOpacity
          className={`bg-primary dark:bg-primary-dark py-4 rounded-lg items-center mt-8 shadow-lg ${
            isSubmitting ? "opacity-50" : ""
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">
              Se connecter
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex flex-row  items-center justify-center mt-8">
          <Text className="text-base font-medium text-text-secondary dark:text-text-secondary-dark mr-2">
            Pas de compte ?
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text className="text-base text-primary dark:text-primary-dark font-semibold ">
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center justify-center mt-4">
          <Text className="text-base font-medium text-text-secondary dark:text-text-secondary-dark mr-2">
            Donnée de Test: test@example.com / password123
          </Text>
        </View>
      </View>
    </View>
  );
}
