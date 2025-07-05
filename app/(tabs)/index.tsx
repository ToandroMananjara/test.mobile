import ProductList from "@/features/product/components/ProductList";
import { router, Stack } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-row items-center px-4 py-5 bg-card dark:bg-card-dark border-b border-border dark:border-border-dark">
        <Text className="text-lg font-bold text-foreground dark:text-foreground-dark flex-1">
          Listes des produits
        </Text>
      </View>
      <ProductList />
    </>
  );
}
