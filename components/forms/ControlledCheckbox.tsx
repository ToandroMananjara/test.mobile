import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Check } from "lucide-react-native";

interface ControlledCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  error?: string;
  containerStyle?: any;
  disabled?: boolean;
}

export default function ControlledCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  error,
  containerStyle,
  disabled = false,
}: ControlledCheckboxProps<T>) {
  return (
    <View className="mb-2">
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            className={`flex-row items-center py-2 ${
              disabled ? "opacity-50" : ""
            }`}
            onPress={() => !disabled && onChange(!value)}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <View
              className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                value ? "bg-blue-600 border-blue-600" : "border-gray-300"
              }`}
            >
              {value && <Check size={12} color="#fff" />}
            </View>
            <Text
              className={`text-sm text-gray-800 flex-1 ${
                disabled ? "opacity-50" : ""
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
}
