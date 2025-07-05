import ProductList from "@/features/product/components/ProductList";
import React from "react";
import { View } from "react-native";
import { PageHeader } from "@/components/ui";
import { Stack } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-background dark:bg-background-dark">
        <PageHeader title="Liste des produits" showBackButton={false} />
        <ProductList />
      </View>
    </>
  );
}
