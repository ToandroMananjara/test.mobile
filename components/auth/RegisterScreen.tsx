import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "@/components/useColorScheme";
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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const shouldShowRules = showRules || isSubmitted;

  return (
    <>
      <ControlledInput
        label="Email"
        name="email"
        control={control}
        placeholder="Entrez votre email"
        autoCapitalize="none"
        keyboardType="email-address"
        error={errors.email?.message}
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark focus:border-primary dark:focus:border-primary-dark"
      />

      <ControlledPassword
        label="Mot de passe"
        name="password"
        control={control}
        placeholder="Entrez votre mot de passe"
        error={errors.password?.message}
        onFocus={() => setShowRules(true)}
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark focus:border-primary dark:focus:border-primary-dark"
      />

      {!shouldShowRules && (
        <Text className="text-sm text-text-muted dark:text-text-muted-dark mb-3">
          Le mot de passe doit contenir au moins 8 caractères, une majuscule, un
          chiffre et un caractère spécial.
        </Text>
      )}

      {shouldShowRules && (
        <View className="mb-4 p-3 bg-muted/50 dark:bg-muted-dark/50 rounded-lg border border-border dark:border-border-dark">
          <Text className="text-sm font-medium text-foreground dark:text-foreground-dark mb-2">
            Critères du mot de passe :
          </Text>
          {passwordRules.map((rule, idx) => {
            const valid = rule.test(password);

            const getColorClass = () => {
              if (valid) return "text-green-600 dark:text-green-400";
              if (isSubmitted)
                return "text-destructive dark:text-destructive-dark";
              return "text-text-muted dark:text-text-muted-dark";
            };

            return (
              <Text key={idx} className={`text-sm ${getColorClass()} mb-1`}>
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
        placeholder="Confirmez votre mot de passe"
        error={errors.confirmPassword?.message}
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark focus:border-primary dark:focus:border-primary-dark"
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
        placeholder="Entrez votre nom"
        error={errors.lastName?.message}
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark focus:border-primary dark:focus:border-primary-dark"
      />
      <ControlledInput
        label="Prénom"
        name="firstName"
        control={control}
        placeholder="Entrez votre prénom"
        error={errors.firstName?.message}
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark focus:border-primary dark:focus:border-primary-dark"
      />
      <ControlledInput
        label="Adresse"
        name="address"
        control={control}
        placeholder="Entrez votre adresse (optionnel)"
        error={errors.address?.message}
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark focus:border-primary dark:focus:border-primary-dark"
      />
      <ControlledInput
        label="Téléphone"
        name="phone"
        control={control}
        placeholder="Entrez votre téléphone (optionnel)"
        keyboardType="phone-pad"
        error={errors.phone?.message}
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark focus:border-primary dark:focus:border-primary-dark"
      />
    </>
  );
}

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

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
        className="flex-1 bg-background dark:bg-background-dark"
      >
        <View>
          <FormStepperWrapper
            title="Créer un compte"
            steps={steps}
            onSubmit={methods.handleSubmit(onSubmit)}
            loading={methods.formState.isSubmitting}
            error={methods.formState.errors.root?.message || null}
            showSuccess={false}
          />
          <View className="flex-row justify-center mt-6 px-6">
            <Text className="text-base text-text-secondary dark:text-text-secondary-dark mr-2">
              Déjà un compte ?
            </Text>
            <TouchableOpacity onPress={() => router.replace("/auth/login")}>
              <Text className="text-base text-primary dark:text-primary-dark font-semibold ">
                Se connecter
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </FormProvider>
  );
}
