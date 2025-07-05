import React from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
} from "react-native";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface ControlledNumberProps<T extends FieldValues>
  extends Omit<
    TextInputProps,
    "onChangeText" | "onBlur" | "value" | "keyboardType"
  > {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  containerStyle?: string;
  inputStyle?: string;
  allowDecimals?: boolean;
}

export default function ControlledNumber<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  containerStyle,
  inputStyle,
  allowDecimals = false,
  ...textInputProps
}: ControlledNumberProps<T>) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleNumberChange = (
    text: string,
    onChange: (value: string) => void
  ) => {
    const regex = allowDecimals ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;

    if (text === "" || regex.test(text)) {
      onChange(text);
    }
  };

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
            className={`p-3 rounded-lg border text-base ${
              error
                ? "border-destructive dark:border-destructive-dark"
                : "border-border dark:border-border-dark"
            } ${
              inputStyle ||
              "bg-input dark:bg-input-dark text-foreground dark:text-foreground-dark"
            }`}
            keyboardType={allowDecimals ? "decimal-pad" : "numeric"}
            onBlur={onBlur}
            onChangeText={(text) => handleNumberChange(text, onChange)}
            value={value?.toString() || ""}
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
