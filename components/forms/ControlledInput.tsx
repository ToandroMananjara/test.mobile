import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface ControlledInputProps<T extends FieldValues>
  extends Omit<TextInputProps, "onChangeText" | "onBlur" | "value"> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  containerStyle?: any;
  inputStyle?: any;
}

export default function ControlledInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  containerStyle,
  inputStyle,

  ...textInputProps
}: ControlledInputProps<T>) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="mb-4">
      {label && (
        <Text
          className={`text-sm font-medium mb-2 ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
            className={`p-3 rounded-lg border text-base ${
              error ? "border-red-500" : ""
            }`}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...textInputProps}
          />
        )}
      />

      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
}
