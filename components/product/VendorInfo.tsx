import { View, Text } from "react-native";
import type { Product } from "@/types/product.type";

interface VendorInfoProps {
  product: Product;
}

export function VendorInfo({ product }: VendorInfoProps) {
  return (
    <View className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 mb-8 shadow-sm">
      <Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        Vendu par
      </Text>
      <View className="flex-row items-center mb-3">
        <Text className="text-sm text-gray-900 dark:text-gray-100 opacity-70 font-semibold">
          Nom :
        </Text>
        <Text className="text-sm text-gray-900 dark:text-gray-100 ml-2">
          {product.vendeur.name}
        </Text>
      </View>
      <View className="flex-row items-center mb-3">
        <Text className="text-sm text-gray-900 dark:text-gray-100 opacity-70 font-semibold">
          Email :
        </Text>
        <Text className="text-sm text-gray-900 dark:text-gray-100 ml-2">
          {product.vendeur.email}
        </Text>
      </View>
      <View className="flex-row items-center mb-3">
        <Text className="text-sm text-gray-900 dark:text-gray-100 opacity-70 font-semibold">
          Adresse :
        </Text>
        <Text className="text-sm text-gray-900 dark:text-gray-100 flex-1 ml-2">
          {product.vendeur.address}
        </Text>
      </View>
      <View className="flex-row items-center">
        <Text className="text-sm text-gray-900 dark:text-gray-100 opacity-70 font-semibold">
          Téléphone :
        </Text>
        <Text className="text-sm text-gray-900 dark:text-gray-100 ml-2">
          {product.vendeur.phone}
        </Text>
      </View>
    </View>
  );
}
