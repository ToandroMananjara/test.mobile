import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
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
  containerStyle?: any;
  inputStyle?: any;
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
            className={`bg-white p-3.5 rounded-lg border text-base text-gray-800 min-h-24 ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            multiline={true}
            numberOfLines={numberOfLines}
            textAlignVertical="top"
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
