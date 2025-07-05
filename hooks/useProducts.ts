import { useState, useEffect } from "react";
import { useProductsContext } from "@/contexts/ProductsContext";
import { Product } from "@/types/product.type";
type ProductFilters = { search?: string; category?: string; vendeur?: string };
export const useProducts = () => {
  const {
    products,
    loading: contextLoading,
    deleteProduct: contextDeleteProduct,
  } = useProductsContext();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({});
  useEffect(() => {
    applyFilters();
  }, [filters, products]);
  const applyFilters = () => {
    let filtered = products;
    if (filters.search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(filters.search!.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(filters.search!.toLowerCase())
      );
    }
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }
    if (filters.vendeur) {
      filtered = filtered.filter(
        (product) => product.vendeur.name === filters.vendeur
      );
    }
    setFilteredProducts(filtered);
  };
  const handleFilterChange = (key: keyof ProductFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }));
  };
  const deleteProduct = async (id: string) => {
    const result = await contextDeleteProduct(id);
    return result;
  };
  const getCategories = (): string[] => {
    const categories = [...new Set(products.map((p) => p.category))];
    return categories.length > 0
      ? categories
      : [
          "Électronique",
          "Vêtements",
          "Maison & Jardin",
          "Sports & Loisirs",
          "Livres",
          "Beauté & Santé",
        ];
  };
  const getVendeurs = (): string[] => {
    const vendeurs = [...new Set(products.map((p) => p.vendeur.name))];
    return vendeurs.length > 0
      ? vendeurs
      : [
          "TechStore Paris",
          "Mobile Expert",
          "Apple Store Lyon",
          "Fashion Boutique",
          "Home & Garden",
          "Sports Center",
        ];
  };
  return {
    products,
    filteredProducts,
    filters,
    productState: {
      loading: contextLoading,
      success: !contextLoading && products.length > 0,
      error: null,
    },
    handleFilterChange,
    deleteProduct,
    getCategories,
    getVendeurs,
  };
};
