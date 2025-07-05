import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useProducts } from "@/hooks/useProducts";
import { useProductsContext } from "@/contexts/ProductsContext";
import type { Product } from "@/types/product.type";
import { useColorScheme } from "@/components/useColorScheme";
import {
  ProductImageHeader,
  ProductInfo,
  VendorInfo,
  ProductActions,
} from "@/components/product";
import { LoadingState, ErrorState, PageHeader } from "@/components/ui";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { productState } = useProducts();
  const { getProductById } = useProductsContext();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productState.success && id) {
      const found = getProductById(id as string);
      setProduct(found || null);
    }
  }, [id, productState.success]);

  const handleBackToProducts = () => {
    router.push("/(tabs)");
  };

  if (productState.loading) {
    return <LoadingState message="Chargement du produit..." />;
  }

  if (productState.error) {
    return (
      <ErrorState
        message={productState.error}
        onRetry={handleBackToProducts}
        retryText="Retour aux produits"
      />
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark px-6">
        <FontAwesome
          name="search"
          size={64}
          color={isDark ? "#64748b" : "#9ca3af"}
        />
        <Text className="mt-6 text-foreground dark:text-foreground-dark text-xl font-semibold">
          Produit non trouvé
        </Text>
        <Text className="mt-3 text-foreground dark:text-foreground-dark opacity-70 text-center text-base">
          Le produit demandé n'existe pas ou a été supprimé.
        </Text>
        <TouchableOpacity
          className="mt-6 bg-primary dark:bg-primary-dark px-8 py-4 rounded-lg shadow-lg"
          onPress={handleBackToProducts}
        >
          <Text className="text-white font-semibold text-base">
            Retour aux produits
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-background dark:bg-background-dark">
        <PageHeader title={product.name} onBack={handleBackToProducts} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          <ProductImageHeader product={product} />

          <ProductInfo product={product} />
        </ScrollView>
      </View>
    </>
  );
}
