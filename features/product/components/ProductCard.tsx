import React from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useColorScheme } from "@/components/useColorScheme";
import { Product } from "@/types/product.type";
// import { Image } from "expo-image";

type ProductCardProps = {
  product: Product;
  onDelete: (id: string, name: string) => void;
  onEdit?: (id: string) => void;
  onViewDetails?: (id: string) => void;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
export function ProductCard({ product, onDelete }: ProductCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleDelete = () => {
    onDelete(product.id, product.name);
  };

  return (
    <View className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4 animate-fade-in">
      <View style={{ padding: 16 }}>
        <View className="flex-row" style={{ gap: 2 }}>
          <View style={{ marginRight: 8 }}>
            <Image
              style={styles.tinyLogo}
              // source={require("@/assets/images/splash-icon.png")}
              source={{
                uri: "https://reactnative.dev/img/tiny_logo.png",
              }}
            />
          </View>

          <View className="flex-1 pr-4">
            <View className=" flex-row justify-between items-start mb-2">
              <Text
                className="font-semibold text-gray-800 dark:text-gray-100 flex-1 mr-2"
                numberOfLines={1}
              >
                {product.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => console.log("Edit product", product.id)}
                  className="p-1 rounded"
                >
                  <FontAwesome
                    name="edit"
                    size={30}
                    color={isDark ? "#60a5fa" : "#3b82f6"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDelete}
                  className="p-1 rounded"
                >
                  <FontAwesome name="trash" size={30} color="#dc2626" />
                </TouchableOpacity>
              </View>
            </View>

            <Text
              className="text-base text-gray-600 dark:text-gray-400 mb-2"
              numberOfLines={2}
            >
              {product.description}
            </Text>

            <View className="flex-row justify-between items-center my-2 mb-2">
              <View>
                <Text className="font-bold text-blue-600 dark:text-blue-400">
                  {product.price.toFixed(0)} Ar
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  Stock: {product.stock}
                </Text>
              </View>
              <View className="items-end">
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  {product.category}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  {product.vendeur}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => console.log("Voir détails", product.id)}
          className="w-full mt-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
        >
          <Text className="text-center text-base text-gray-300 font-medium">
            Voir détails
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
