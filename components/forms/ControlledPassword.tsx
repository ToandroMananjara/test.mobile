import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react-native";

interface ControlledPasswordProps<T extends FieldValues>
  extends Omit<
    TextInputProps,
    "onChangeText" | "onBlur" | "value" | "secureTextEntry"
  > {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  containerStyle?: any;
  inputStyle?: any;
  showToggleButton?: boolean;
}

export default function ControlledPassword<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Mot de passe",
  error,
  containerStyle,
  inputStyle,
  showToggleButton = true,
  ...textInputProps
}: ControlledPasswordProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="mb-2">
      {label && (
        <Text className="text-lg font-semibold text-gray-800 mb-1.5">
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative justify-center">
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              className={`bg-white p-3.5 pr-12 rounded-lg border text-base text-gray-800 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              secureTextEntry={!showPassword}
              onBlur={onBlur}
              onFocus={onBlur}
              onChangeText={onChange}
              value={value}
              {...textInputProps}
            />
            {showToggleButton && (
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 h-full justify-center"
                activeOpacity={0.7}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      />

      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
}
