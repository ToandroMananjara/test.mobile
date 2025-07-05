import React, { useState } from "react";
import { View, Text } from "react-native";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ControlledInput, ControlledPassword } from "@/components/forms";
import { FormStepperWrapper } from "@/components/forms/FormStepperWrapper";
import { AccountSchema, AccountSchemaValues } from "@/schemas/account.schema";
import { useAuth } from "@/contexts/AuthContext";

const passwordRules = [
  { label: "Au moins 8 caractères", test: (v: string) => v.length >= 8 },
  { label: "Au moins une majuscule", test: (v: string) => /[A-Z]/.test(v) },
  { label: "Au moins un chiffre", test: (v: string) => /\d/.test(v) },
  {
    label: "Au moins un caractère spécial",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
];

function StepCredentials() {
  const {
    control,
    formState: { errors, isSubmitted },
    watch,
  } = useFormContext<AccountSchemaValues>();

  const password = watch("password") || "";
  const [showRules, setShowRules] = useState(false);

  const shouldShowRules = showRules || isSubmitted;

  return (
    <>
      <ControlledInput
        label="Email"
        name="email"
        control={control}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        error={errors.email?.message}
      />

      <ControlledPassword
        label="Mot de passe"
        name="password"
        control={control}
        placeholder="Mot de passe"
        error={errors.password?.message}
        onFocus={() => setShowRules(true)}
      />

      {!shouldShowRules && (
        <Text className="text-sm text-gray-500 mb-2">
          Le mot de passe doit contenir au moins 8 caractères, une majuscule, un
          chiffre et un caractère spécial.
        </Text>
      )}

      {shouldShowRules && (
        <View className="mb-2">
          {passwordRules.map((rule, idx) => {
            const valid = rule.test(password);

            const color = valid
              ? "text-green-600"
              : isSubmitted
              ? "text-red-500"
              : "text-gray-500";

            return (
              <Text key={idx} className={`text-sm ${color} mb-0.5`}>
                {valid ? "✔" : "✘"} {rule.label}
              </Text>
            );
          })}
        </View>
      )}

      <ControlledPassword
        label="Confirmer le mot de passe"
        name="confirmPassword"
        control={control}
        placeholder="Confirmer le mot de passe"
        error={errors.confirmPassword?.message}
      />
    </>
  );
}

function StepProfile() {
  const {
    control,
    formState: { errors },
  } = useFormContext<AccountSchemaValues>();

  return (
    <>
      <ControlledInput
        label="Nom"
        name="lastName"
        control={control}
        placeholder="Nom"
        error={errors.lastName?.message}
      />
      <ControlledInput
        label="Prénom"
        name="firstName"
        control={control}
        placeholder="Prénom"
        error={errors.firstName?.message}
      />
      <ControlledInput
        label="Adresse"
        name="address"
        control={control}
        placeholder="Adresse (optionnel)"
        error={errors.address?.message}
      />
      <ControlledInput
        label="Téléphone"
        name="phone"
        control={control}
        placeholder="Téléphone (optionnel)"
        keyboardType="phone-pad"
        error={errors.phone?.message}
      />
    </>
  );
}

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const insets = useSafeAreaInsets();

  const methods = useForm<AccountSchemaValues>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (data: AccountSchemaValues) => {
    const result = await signUp(data);
    if (result.success) {
      console.log("User Creer");
      router.replace("/auth/login");
    }
  };

  const steps = [
    {
      label: "Identifiants",
      content: <StepCredentials />,
      fields: ["email", "password", "confirmPassword"],
    },
    {
      label: "Profil",
      content: <StepProfile />,
      fields: ["firstName", "lastName", "address", "phone"],
    },
  ];

  return (
    <FormProvider {...methods}>
      <View
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
        className="flex justify-center"
      >
        <FormStepperWrapper
          title="Créer un compte"
          steps={steps}
          onSubmit={methods.handleSubmit(onSubmit)}
          loading={methods.formState.isSubmitting}
          error={methods.formState.errors.root?.message || null}
          showSuccess={false}
        />
        <View className="flex-row justify-center mt-4">
          <Text className="flex text-lg text-gray-600">Déjà un compte ? </Text>
          <Text
            className="flex text-lg text-blue-600 font-semibold"
            onPress={() => router.replace("/auth/login")}
          >
            Se connecter
          </Text>
        </View>
      </View>
    </FormProvider>
  );
}
