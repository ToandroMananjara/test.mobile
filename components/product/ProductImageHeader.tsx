import { View, Image, Text, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Product } from "@/types/product.type";

interface ProductImageHeaderProps {
  product: Product;
}

const { width } = Dimensions.get("window");

export function ProductImageHeader({ product }: ProductImageHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="relative">
      <Image
        source={{
          uri:
            product.image?.trim() ||
            "https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Pas+d'image",
        }}
        style={{ width: "100%", height: width * 0.75 }}
        resizeMode="cover"
      />

      <View
        style={{
          position: "absolute",
          top: insets.top,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 12,
          backgroundColor: "rgba(0,0,0,0.3)",
        }}
      >
        <View className="px-3 py-1 rounded-full bg-background dark:bg-card-dark shadow-md opacity-95">
          <Text
            className={`text-sm font-semibold ${
              product.stock > 0
                ? "text-green-600 dark:text-green-400"
                : "text-destructive dark:text-destructive-dark"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} en stock`
              : "Rupture de stock"}
          </Text>
        </View>
      </View>
    </View>
  );
}
