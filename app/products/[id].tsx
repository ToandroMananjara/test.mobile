import {
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  View,
  Text,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useProducts } from "@/hooks/useProducts";
import type { Product } from "@/types/product.type";
import { useColorScheme } from "@/components/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const { getProductById, deleteProduct, productState } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productState.success && id) {
      const found = getProductById(id as string);
      setProduct(found || null);
    }
  }, [id, productState.success]);

  const handleDelete = () => {
    if (!product) return;
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

  if (productState.loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark">
        <View className="w-12 h-12 border-4 border-primary dark:border-primary-dark border-t-transparent rounded-full animate-spin" />
        <Text className="mt-4 text-foreground dark:text-foreground-dark text-base">
          Chargement du produit...
        </Text>
      </View>
    );
  }

  if (productState.error) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark px-6">
        <FontAwesome
          name="exclamation-triangle"
          size={64}
          color={isDark ? "#b91c1c" : "#ef4444"}
        />
        <Text className="mt-6 text-destructive dark:text-destructive-dark text-xl font-semibold text-center">
          Erreur
        </Text>
        <Text className="mt-3 text-base text-center text-foreground dark:text-foreground-dark opacity-70">
          {productState.error}
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)")}
          className="mt-6 bg-primary dark:bg-primary-dark px-8 py-4 rounded-lg shadow-lg"
        >
          <Text className="text-white font-semibold text-base">
            Retour aux produits
          </Text>
        </TouchableOpacity>
      </View>
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
          onPress={() => router.push("/(tabs)")}
        >
          <Text className="text-white font-semibold text-base">
            Retour aux produits
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
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

        <View className="bg-background dark:bg-background-dark -mt-5 rounded-t-3xl px-5 pt-6 shadow-lg">
          <View className="flex-row justify-between items-center mb-6">
            <View className="mb-6">
              <Text className="text-3xl font-bold text-foreground dark:text-foreground-dark mb-2">
                {product.name}
              </Text>
              <View className="flex-row items-baseline">
                <Text className="text-xs text-foreground dark:text-foreground-dark opacity-60 mr-2">
                  Prix
                </Text>
                <Text className="text-3xl font-bold text-primary dark:text-primary-dark">
                  {product.price.toLocaleString("fr-MG")} Ar
                </Text>
              </View>
            </View>
            <View className="mb-6">
              <View className="bg-muted dark:bg-muted-dark px-4 py-2 rounded-full self-start border border-border dark:border-border-dark">
                <Text className="text-sm font-semibold text-primary dark:text-primary-dark">
                  {product.category}
                </Text>
              </View>
            </View>
          </View>
          {product.description && (
            <View className="mb-8">
              <Text className="text-lg font-semibold text-foreground dark:text-foreground-dark mb-3">
                Description
              </Text>
              <Text className="text-base text-foreground dark:text-foreground-dark opacity-80 leading-6">
                {product.description}
              </Text>
            </View>
          )}
          <View className="rounded-xl border border-border dark:border-border-dark bg-card dark:bg-card-dark p-5 mb-8 shadow-sm">
            <Text className="text-lg font-bold text-foreground dark:text-foreground-dark mb-4">
              Vendu par
            </Text>

            <View className="flex-row items-center mb-3">
              <Text className="text-sm text-foreground dark:text-foreground-dark opacity-70 font-semibold">
                Nom :
              </Text>
              <Text className="text-sm text-foreground dark:text-foreground-dark ml-2">
                {product.vendeur.name}
              </Text>
            </View>

            <View className="flex-row items-center mb-3">
              <Text className="text-sm text-foreground dark:text-foreground-dark opacity-70 font-semibold">
                Email :
              </Text>
              <Text className="text-sm text-foreground dark:text-foreground-dark ml-2">
                {product.vendeur.email}
              </Text>
            </View>

            <View className="flex-row items-center mb-3">
              <Text className="text-sm text-foreground dark:text-foreground-dark opacity-70 font-semibold">
                Adresse :
              </Text>
              <Text className="text-sm text-foreground dark:text-foreground-dark flex-1 ml-2">
                {product.vendeur.address}
              </Text>
            </View>

            <View className="flex-row items-center">
              <Text className="text-sm text-foreground dark:text-foreground-dark opacity-70 font-semibold">
                Téléphone :
              </Text>
              <Text className="text-sm text-foreground dark:text-foreground-dark ml-2">
                {product.vendeur.phone}
              </Text>
            </View>
          </View>
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
          de meme pour la couleur de celle ci
        </View>
      </ScrollView>
    </View>
  );
}
