import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useFormContext } from "react-hook-form";
import { useColorScheme } from "@/components/useColorScheme";

type StepConfig = {
  label: string;
  content: React.ReactNode;
  fields: string[];
};

type Props = {
  title: string;
  steps: StepConfig[];
  onSubmit: () => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
  showSuccess?: boolean;
  successComponent?: React.ReactNode;
};

export function FormStepperWrapper({
  title,
  steps,
  onSubmit,
  loading = false,
  error = null,
  showSuccess = false,
  successComponent,
}: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const form = useFormContext();
  const {
    trigger,
    formState: { errors },
  } = form;

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const currentFields = steps[currentStep].fields;
  const hasStepErrors = currentFields.some((field) => errors[field]);

  const handleNext = async () => {
    const valid = await trigger(currentFields);
    if (valid) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
  };

  const handleFinalSubmit = async () => {
    const valid = await trigger(currentFields);
    if (valid) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      await onSubmit();
    }
  };

  if (showSuccess && successComponent) {
    return (
      <View className="flex-1 justify-center px-6 bg-background dark:bg-background-dark">
        {successComponent}
      </View>
    );
  }

  return (
    <ScrollView
      className="px-6 pt-10 bg-background dark:bg-background-dark"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-3xl font-bold text-center mb-6 text-foreground dark:text-foreground-dark">
        {title}
      </Text>

      {/* Step Indicator */}
      <View className="flex-row justify-center items-center mb-8 gap-x-4">
        {steps.map((_, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = completedSteps.has(idx);

          return (
            <View key={idx} className="items-center flex-1 max-w-20">
              <View
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-sm ${
                  isActive
                    ? "bg-primary dark:bg-primary-dark border-primary dark:border-primary-dark"
                    : isCompleted
                    ? "bg-green-500 dark:bg-green-600 border-green-500 dark:border-green-600"
                    : "bg-card dark:bg-card-dark border-border dark:border-border-dark"
                }`}
              >
                <Text
                  className={`font-bold text-sm ${
                    isActive
                      ? "text-white"
                      : isCompleted
                      ? "text-white"
                      : "text-foreground dark:text-foreground-dark"
                  }`}
                >
                  {isCompleted ? "✓" : idx + 1}
                </Text>
              </View>
              <Text className="text-xs mt-2 text-center text-foreground dark:text-foreground-dark font-medium">
                {steps[idx].label}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Error Messages */}
      {error && (
        <View className="bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/20 dark:border-destructive-dark/20 p-4 rounded-lg mb-6">
          <Text className="text-destructive dark:text-destructive-dark text-sm text-center font-medium">
            {error}
          </Text>
        </View>
      )}

      {hasStepErrors && (
        <View className="bg-destructive/10 dark:bg-destructive-dark/10 border border-destructive/20 dark:border-destructive-dark/20 p-4 rounded-lg mb-6">
          <Text className="text-destructive dark:text-destructive-dark text-sm text-center font-medium">
            Veuillez corriger les erreurs avant de continuer.
          </Text>
        </View>
      )}

      {/* Step Content */}
      <View className="gap-5 mb-8">{steps[currentStep].content}</View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between gap-4 pb-6">
        {!isFirstStep ? (
          <TouchableOpacity
            className={`flex-1 bg-muted dark:bg-muted-dark py-4 rounded-lg items-center border border-border dark:border-border-dark ${
              loading ? "opacity-50" : ""
            }`}
            onPress={handleBack}
            disabled={loading}
          >
            <Text className="text-foreground dark:text-foreground-dark font-semibold">
              Précédent
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-1" />
        )}

        {isLastStep ? (
          <TouchableOpacity
            className={`flex-1 bg-primary dark:bg-primary-dark py-4 rounded-lg items-center shadow-lg ${
              loading ? "opacity-50" : ""
            }`}
            onPress={handleFinalSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white font-semibold">Créer le compte</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className={`flex-1 bg-primary dark:bg-primary-dark py-4 rounded-lg items-center shadow-lg ${
              loading ? "opacity-50" : ""
            }`}
            onPress={handleNext}
            disabled={loading}
          >
            <Text className="text-white font-semibold">Suivant</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}
