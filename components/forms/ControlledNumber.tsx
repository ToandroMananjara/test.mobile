import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
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
  containerStyle?: any;
  inputStyle?: any;
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
    <View className="mb-2">
      {label && (
        <Text className="text-sm font-semibold text-gray-800 mb-1.5">
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            className={`bg-white p-3.5 rounded-lg border text-base text-gray-800 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            keyboardType={allowDecimals ? "decimal-pad" : "numeric"}
            onBlur={onBlur}
            onChangeText={(text) => handleNumberChange(text, onChange)}
            value={value?.toString() || ""}
            {...textInputProps}
          />
        )}
      />

      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
}
