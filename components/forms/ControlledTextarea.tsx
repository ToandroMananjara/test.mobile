import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface ControlledTextareaProps<T extends FieldValues>
  extends Omit<
    TextInputProps,
    "onChangeText" | "onBlur" | "value" | "multiline"
  > {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  containerStyle?: string;
  inputStyle?: string;
  numberOfLines?: number;
}

export default function ControlledTextarea<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  containerStyle,
  inputStyle,
  numberOfLines = 4,
  ...textInputProps
}: ControlledTextareaProps<T>) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className={`mb-4 ${containerStyle || ""}`}>
      {label && (
        <Text className="text-sm font-medium mb-2 text-foreground dark:text-foreground-dark">
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
            className={`p-3 rounded-lg border text-base min-h-20 ${
              error
                ? "border-destructive dark:border-destructive-dark"
                : "border-border dark:border-border-dark"
            } ${
              inputStyle ||
              "bg-input dark:bg-input-dark text-foreground dark:text-foreground-dark"
            }`}
            multiline
            numberOfLines={numberOfLines}
            textAlignVertical="top"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...textInputProps}
          />
        )}
      />

      {error && (
        <Text className="text-destructive dark:text-destructive-dark text-xs mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}
