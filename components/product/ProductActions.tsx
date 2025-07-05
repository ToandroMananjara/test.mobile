import { View, TouchableOpacity, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import type { Product } from "@/types/product.type";
import { useProducts } from "@/hooks/useProducts";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const { deleteProduct } = useProducts();

  const handleDelete = () => {
    Alert.alert(
      "Supprimer le produit",
      `Êtes-vous sûr de vouloir supprimer "${product.name}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            const result = await deleteProduct(product.id);
            if (result.success) {
              Alert.alert(
                "Succès",
                `${product.name} a été supprimé avec succès`
              );
              router.push("/(tabs)");
            } else {
              Alert.alert("Erreur", "Impossible de supprimer le produit");
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-row gap-4 mb-4">
      <TouchableOpacity
        className="flex-1 bg-primary dark:bg-primary-dark py-4 rounded-lg shadow-lg"
        onPress={() => router.push(`/products/edit/${product.id}`)}
      >
        <Text className="text-white text-center font-semibold text-base">
          Modifier
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex-1 bg-destructive dark:bg-destructive-dark py-4 rounded-lg shadow-lg"
        onPress={handleDelete}
      >
        <Text className="text-white text-center font-semibold text-base">
          Supprimer
        </Text>
      </TouchableOpacity>
    </View>
  );
}
