import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useFormContext } from "react-hook-form";

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
      <View className="flex-1 justify-center px-6">{successComponent}</View>
    );
  }

  return (
    <ScrollView className="px-6 pt-10" keyboardShouldPersistTaps="handled">
      <Text className="text-3xl font-bold text-center mb-4">{title}</Text>
      <View className="flex-row justify-center items-center mb-6 space-x-2">
        {steps.map((_, idx) => (
          <View
            key={idx}
            className={`w-10 h-10 rounded-full flex items-center justify-center
        ${idx === currentStep ? "bg-blue-600" : "bg-blue-100"}
      `}
          >
            <Text
              className={`font-bold ${
                idx === currentStep ? "text-white" : "text-blue-700"
              }`}
            >
              {idx + 1}
            </Text>
          </View>
        ))}
      </View>

      {error && (
        <View className="bg-red-50 border border-red-300 p-3 rounded-lg mb-4">
          <Text className="text-red-600 text-sm text-center">{error}</Text>
        </View>
      )}

      {hasStepErrors && (
        <View className="bg-red-50 border border-red-300 p-3 rounded-lg mb-4">
          <Text className="text-red-600 text-sm text-center">
            Veuillez corriger les erreurs avant de continuer.
          </Text>
        </View>
      )}

      <View className="space-y-4 mb-6">{steps[currentStep].content}</View>

      <View className="flex-row justify-between space-x-4">
        {!isFirstStep ? (
          <TouchableOpacity
            className="flex-1 bg-gray-200 py-4 rounded-lg items-center mb-4"
            onPress={handleBack}
            disabled={loading}
          >
            <Text className="text-gray-800 font-semibold">Précédent</Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-1" />
        )}

        {isLastStep ? (
          <TouchableOpacity
            className="flex-1 bg-blue-600 py-4 rounded-lg items-center mb-4"
            onPress={handleFinalSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold">Valider</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="flex-1 bg-blue-600 py-4 rounded-lg items-center mb-4"
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
