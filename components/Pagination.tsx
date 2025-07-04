import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "@/components/useColorScheme";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  if (totalPages <= 1) return null;

  return (
    <View className="flex-row items-center justify-center gap-2 mt-6 mb-6">
      <TouchableOpacity
        className={`px-4 py-2 rounded-lg border ${
          currentPage === 1
            ? "opacity-50 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            : "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        }`}
        disabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
      >
        <FontAwesome
          name="chevron-left"
          size={18}
          color={
            currentPage === 1
              ? isDark
                ? "#6B7280"
                : "#9CA3AF"
              : isDark
              ? "#F3F4F6"
              : "#374151"
          }
        />
      </TouchableOpacity>

      <View className="px-3">
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} sur {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        className={`px-4 py-2 rounded-lg border ${
          currentPage === totalPages
            ? "opacity-50 bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            : "bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
        }`}
        disabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
      >
        <FontAwesome
          name="chevron-right"
          size={18}
          color={
            currentPage === totalPages
              ? isDark
                ? "#6B7280"
                : "#9CA3AF"
              : isDark
              ? "#F3F4F6"
              : "#374151"
          }
        />
      </TouchableOpacity>
    </View>
  );
};
