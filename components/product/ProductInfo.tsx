import { View, Text } from "react-native";
import type { Product } from "@/types/product.type";
import { ProductActions, VendorInfo } from ".";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <View className="bg-white dark:bg-gray-900 -mt-5 rounded-t-3xl px-5 pt-6 shadow-lg">
      <View className="flex-row justify-between items-center mb-6">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {product.name}
          </Text>
          <View className="flex-row items-baseline">
            <Text className="text-xs text-gray-900 dark:text-gray-100 opacity-60 mr-2">
              Prix
            </Text>
            <Text className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {product.price.toLocaleString("fr-MG")} Ar
            </Text>
          </View>
        </View>
        <View className="mb-6">
          <View className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full self-start border border-gray-200 dark:border-gray-700">
            <Text className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {product.category}
            </Text>
          </View>
        </View>
      </View>
      {product.description && (
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Description
          </Text>
          <Text className="text-base text-gray-900 dark:text-gray-100 opacity-80 leading-6">
            {product.description}
          </Text>
        </View>
      )}
      <VendorInfo product={product} />
      <ProductActions product={product} />
    </View>
  );
}
