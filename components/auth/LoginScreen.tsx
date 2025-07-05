import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "test@example.com",
      password: "password123",
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
      className="flex-1 justify-center px-6 bg-gray-50"
    >
      <Text className="text-3xl font-bold text-center mb-2 text-gray-800">
        Bienvenue 👋
      </Text>
      <Text className="text-base text-center text-gray-600 mb-8">
        Connecte-toi pour continuer
      </Text>

      {errors.root?.message && (
        <View className=" flex flex-row justify-center items-center bg-red-50 rounded-lg p-3 mb-4 border border-red-200">
          <Text className="text-red-700 text-xl flex">
            {errors.root.message}
          </Text>
        </View>
      )}

      <View className="space-y-3">
        <ControlledInput
          label="Email"
          control={control}
          name="email"
          placeholder="Email"
          error={errors.email?.message}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <ControlledPassword
          label="Mot de passe"
          control={control}
          name="password"
          placeholder="Mot de passe"
          error={errors.password?.message}
        />

        <TouchableOpacity
          className={`bg-blue-600 py-4 rounded-lg items-center my-3 ${
            isSubmitting ? "opacity-50" : ""
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">
              Se connecter
            </Text>
          )}
        </TouchableOpacity>
        <View className="w-full  flex flex-row gap-3 items-center justify-end">
          <Text className="flex text-lg font-medium">Pas de compte ?</Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text className="flex text-center text-lg text-blue-600 font-medium">
              s'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
