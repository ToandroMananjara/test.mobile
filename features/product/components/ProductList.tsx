import React, { useState, useMemo } from "react";
import {
  FlatList,
  TextInput,
  Alert,
  View,
  Text,
  useColorScheme,
  ListRenderItem,
  RefreshControl,
} from "react-native";
import { ProductCard } from "./ProductCard";
import { Pagination } from "@/components/Pagination";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProducts } from "@/hooks/useProducts";
import { router } from "expo-router";
import { Product } from "@/types/product.type";

export default function ProductList() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  const {
    filteredProducts,
    filters,
    productState,
    handleFilterChange,
    deleteProduct,
    getCategories,
    getVendeurs,
  } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const productsPerPage = 6;

  const paginatedData = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return {
      currentProducts: filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      ),
      totalPages: Math.ceil(filteredProducts.length / productsPerPage),
      indexOfFirstProduct,
      indexOfLastProduct,
    };
  }, [filteredProducts, currentPage, productsPerPage]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
    } finally {
      setRefreshing(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    Alert.alert(
      "Confirmer la suppression",
      `Êtes-vous sûr de vouloir supprimer "${name}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            const result = await deleteProduct(id);
            if (result.success) {
              Alert.alert("Succès", `${name} a été supprimé avec succès`);
              // Ajuster la page si nécessaire
              if (
                paginatedData.currentProducts.length === 1 &&
                currentPage > 1
              ) {
                setCurrentPage(currentPage - 1);
              }
            } else {
              Alert.alert("Erreur", "Impossible de supprimer le produit");
            }
          },
        },
      ]
    );
  };

  const handleEdit = (id: string) => {
    router.push(`/products/edit/${id}`);
  };

  const handleViewDetails = (id: string) => {
    router.push(`/products/${id}`);
  };

  const renderProductItem: ListRenderItem<Product> = ({ item }) => (
    <View className="mb-4 mx-4">
      <ProductCard
        product={item}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onViewDetails={handleViewDetails}
      />
    </View>
  );

  const ListHeaderComponent = () => (
    <View
      className="bg-card dark:bg-card-dark border-b border-border dark:border-border-dark shadow-sm mb-4"
      style={{ paddingTop: insets.top }}
    >
      <View className="px-4 pb-4">
        <View className="mb-4">
          <Text className="text-xl text-foreground dark:text-foreground-dark">
            {filteredProducts.length} produit
            {filteredProducts.length > 1 ? "s" : ""} disponible
            {filteredProducts.length > 1 ? "s" : ""}
          </Text>
        </View>
        <View className="mb-4 ">
          <TextInput
            placeholder="Rechercher un produit..."
            placeholderTextColor={isDark ? "#64748b" : "#9ca3af"}
            className="w-full pl-10 p-3 bg-input dark:bg-input-dark border border-border dark:border-border-dark rounded-lg text-foreground dark:text-foreground-dark"
            value={filters.search || ""}
            onChangeText={(value) => {
              handleFilterChange("search", value);
              setCurrentPage(1);
            }}
          />
        </View>
        <View className="flex-row mb-2">
          <View className="flex-1 mr-2">
            <SelectDropdown
              label="Catégorie"
              options={["all", ...getCategories()]}
              selected={filters.category || "all"}
              onSelect={(value) => {
                handleFilterChange("category", value);
                setCurrentPage(1);
              }}
            />
          </View>
          <View className="flex-1 ml-2">
            <SelectDropdown
              label="Vendeur"
              options={["all", ...getVendeurs()]}
              selected={filters.vendeur || "all"}
              onSelect={(value) => {
                handleFilterChange("vendeur", value);
                setCurrentPage(1);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const ListFooterComponent = () => (
    <View className="p-3">
      {paginatedData.totalPages > 1 && (
        <View className="mb-4">
          <Pagination
            currentPage={currentPage}
            totalPages={paginatedData.totalPages}
            onPageChange={setCurrentPage}
          />
        </View>
      )}

      {filteredProducts.length > 0 && (
        <View className="mb-6 p-3 bg-muted dark:bg-muted-dark rounded-lg">
          <Text className="text-gray-500 py-4 dark:text-gray-400 text-center text-sm">
            Affichage {paginatedData.indexOfFirstProduct + 1} à{" "}
            {Math.min(
              paginatedData.indexOfLastProduct,
              filteredProducts.length
            )}{" "}
            sur {filteredProducts.length} produits
          </Text>
        </View>
      )}
    </View>
  );

  const ListEmptyComponent = () => (
    <View className="py-12 items-center px-4">
      <FontAwesome
        name="exclamation-circle"
        size={48}
        color={isDark ? "#64748b" : "#9ca3af"}
      />
      <Text className="mt-4 text-foreground dark:text-foreground-dark text-center text-base">
        {filteredProducts.length === 0
          ? "Aucun produit trouvé"
          : "Aucun produit sur cette page"}
      </Text>
      {filters.search && (
        <Text className="mt-2 text-gray-500 dark:text-gray-400 text-center text-sm">
          Essayez de modifier vos critères de recherche
        </Text>
      )}
    </View>
  );

  if (productState.loading) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark">
        <View className="w-12 h-12 border-4 border-primary dark:border-primary-dark border-t-transparent rounded-full animate-spin" />
        <Text className="mt-4 text-foreground dark:text-foreground-dark text-base">
          Chargement des produits...
        </Text>
      </View>
    );
  }

  if (productState.error) {
    return (
      <View className="flex-1 justify-center items-center bg-background dark:bg-background-dark px-5">
        <FontAwesome
          name="exclamation-triangle"
          size={48}
          color={isDark ? "#b91c1c" : "#ef4444"}
        />
        <Text className="mt-4 text-destructive dark:text-destructive-dark text-center text-base">
          {productState.error}
        </Text>
        <Text className="mt-2 text-gray-500 dark:text-gray-400 text-center text-sm">
          Veuillez réessayer plus tard
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <FlatList
        data={paginatedData.currentProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 16,
          paddingHorizontal: 8,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[isDark ? "#60a5fa" : "#2563eb"]}
            tintColor={isDark ? "#60a5fa" : "#2563eb"}
          />
        }
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={6}
        windowSize={10}
        ItemSeparatorComponent={null}
      />
    </View>
  );
}
