import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  useColorScheme,
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
  containerStyle?: string;
  inputStyle?: string;
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
          <View className="relative justify-center">
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={isDark ? "#94a3b8" : "#64748b"}
              className={`p-3 pr-12 rounded-lg border text-base ${
                error
                  ? "border-destructive dark:border-destructive-dark"
                  : "border-border dark:border-border-dark"
              } ${
                inputStyle ||
                "bg-input dark:bg-input-dark text-foreground dark:text-foreground-dark"
              }`}
              secureTextEntry={!showPassword}
              onBlur={onBlur}
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
                  <EyeOff size={20} color={isDark ? "#94a3b8" : "#64748b"} />
                ) : (
                  <Eye size={20} color={isDark ? "#94a3b8" : "#64748b"} />
                )}
              </TouchableOpacity>
            )}
          </View>
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
