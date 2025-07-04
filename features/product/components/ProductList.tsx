import React, { useState } from "react";
import { View, Text, ScrollView, TextInput, Alert } from "react-native";
import { ProductCard } from "./ProductCard";
import { Pagination } from "@/components/Pagination";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "@/components/useColorScheme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useProducts } from "@/hooks/useProducts";
import { router } from "expo-router";

const ProductList: React.FC = () => {
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
  const productsPerPage = 6;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

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
              if (currentProducts.length === 1 && currentPage > 1) {
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
    console.log("Edit product with ID:", id);
  };

  const handleViewDetails = (id: string) => {
    console.log("View details for product with ID:", id);
  };

  if (productState.loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark ? "#18181b" : "#f9fafb",
        }}
      >
        <View className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <Text
          style={{
            marginTop: 16,
            color: isDark ? "#9ca3af" : "#6b7280",
          }}
        >
          Chargement des produits...
        </Text>
      </View>
    );
  }

  if (productState.error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isDark ? "#18181b" : "#f9fafb",
          paddingHorizontal: 20,
        }}
      >
        <FontAwesome name="exclamation-triangle" size={48} color="#dc2626" />
        <Text
          style={{
            marginTop: 16,
            color: isDark ? "#9ca3af" : "#6b7280",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          {productState.error}
        </Text>
        <Text
          style={{
            marginTop: 8,
            color: isDark ? "#6b7280" : "#9ca3af",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          Veuillez réessayer plus tard
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? "#18181b" : "#f9fafb",
      }}
    >
      <View
        style={{
          paddingTop: insets.top,
          backgroundColor: isDark ? "#18181b" : "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: isDark ? "#374151" : "#e5e7eb",
          zIndex: 10,
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        }}
      >
        <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 20,
                color: isDark ? "#9ca3af" : "#6b7280",
              }}
            >
              {filteredProducts.length} produit
              {filteredProducts.length > 1 ? "s" : ""} disponible
              {filteredProducts.length > 1 ? "s" : ""}
            </Text>
          </View>

          <View style={{ marginBottom: 16, position: "relative" }}>
            <TextInput
              placeholder="Rechercher un produit..."
              placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"}
              style={{
                width: "100%",
                paddingLeft: 40,
                padding: 12,
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                borderColor: isDark ? "#374151" : "#d1d5db",
                borderWidth: 1,
                borderRadius: 8,
                color: isDark ? "#f9fafb" : "#111827",
              }}
              value={filters.search || ""}
              onChangeText={(value) => {
                handleFilterChange("search", value);
                setCurrentPage(1);
              }}
            />
            <FontAwesome
              name="search"
              size={16}
              color={isDark ? "#9CA3AF" : "#6B7280"}
              style={{
                position: "absolute",
                left: 12,
                top: 16,
              }}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 8 }}>
            <SelectDropdown
              label="Catégorie"
              options={["all", ...getCategories()]}
              selected={filters.category || "all"}
              onSelect={(value) => {
                handleFilterChange("category", value);
                setCurrentPage(1);
              }}
            />
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

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        <View style={{ marginBottom: 0 }}>
          {currentProducts.length === 0 ? (
            <View
              style={{
                paddingVertical: 48,
                alignItems: "center",
              }}
            >
              <FontAwesome
                name="exclamation-circle"
                size={48}
                color={isDark ? "#6B7280" : "#9CA3AF"}
              />
              <Text
                style={{
                  marginTop: 16,
                  color: isDark ? "#9ca3af" : "#6b7280",
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                {filteredProducts.length === 0
                  ? "Aucun produit trouvé"
                  : "Aucun produit sur cette page"}
              </Text>
              {filters.search && (
                <Text
                  style={{
                    marginTop: 8,
                    color: isDark ? "#6b7280" : "#9ca3af",
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  Essayez de modifier vos critères de recherche
                </Text>
              )}
            </View>
          ) : (
            currentProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onViewDetails={handleViewDetails}
              />
            ))
          )}
        </View>

        {totalPages > 1 && (
          <View style={{ marginBottom: 5 }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </View>
        )}

        {filteredProducts.length > 0 && (
          <View
            style={{
              marginBottom: 24,
              padding: 16,
              backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: isDark ? "#9ca3af" : "#6b7280",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Affichage {indexOfFirstProduct + 1} à{" "}
              {Math.min(indexOfLastProduct, filteredProducts.length)} sur{" "}
              {filteredProducts.length} produits
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ProductList;
