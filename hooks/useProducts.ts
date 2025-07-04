import { useState, useEffect } from "react";
import { Alert } from "react-native";
import productsData from "@/data/products.json";
import { Product } from "@/types/product.type";
import { set } from "react-hook-form";

type ProductFilters = {
  search?: string;
  category?: string;
  vendeur?: string;
};

type ProductState = {
  loading: boolean;
  success: boolean;
  error?: string | null;
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilters>({});

  const [productState, setProductState] = useState<ProductState>({
    loading: false,
    success: false,
    error: null,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const loadProducts = async () => {
    try {
      setProductState({ loading: true, success: false, error: null });

      await new Promise((resolve) => setTimeout(resolve, 800));

      setProducts(productsData as Product[]);
      setProductState({ loading: false, success: true, error: null });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Erreur lors du chargement des produits";
      setProductState({
        loading: false,
        success: false,
        error: errorMessage,
      });
      console.error("Erreur loadProducts:", err);
    }
  };

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
    try {
      setProductState({ loading: true, success: false, error: null });

      await new Promise((resolve) => setTimeout(resolve, 500));

      const productToDelete = products.find((p) => p.id === id);

      if (!productToDelete) {
        setProductState({
          loading: false,
          success: false,
          error: "Produit non trouvé",
        });
        return { success: false, error: "Produit non trouvé" };
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      setProductState({ loading: false, success: true, error: null });

      return { success: true, data: productToDelete };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de la suppression";
      setProductState({
        loading: false,
        success: false,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  };

  const updateProduct = async (id: string, updatedData: Partial<Product>) => {
    try {
      setProductState({ loading: true, success: false, error: null });

      await new Promise((resolve) => setTimeout(resolve, 700));

      const existingProduct = products.find((p) => p.id === id);
      if (!existingProduct) {
        setProductState({
          loading: false,
          success: false,
          error: "Produit non trouvé",
        });
        return { success: false, error: "Produit non trouvé" };
      }

      const updatedProduct = { ...existingProduct, ...updatedData };

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );

      setProductState({ loading: false, success: true, error: null });
      Alert.alert("Succès", "Produit mis à jour avec succès");

      return { success: true, data: updatedProduct };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de la mise à jour";
      setProductState({
        loading: false,
        success: false,
        error: errorMessage,
      });
      Alert.alert("Erreur", "Impossible de mettre à jour le produit");
      return { success: false, error: errorMessage };
    }
  };

  const createProduct = async (productData: Omit<Product, "id">) => {
    try {
      setProductState({ loading: true, success: false, error: null });

      await new Promise((resolve) => setTimeout(resolve, 600));

      const newProduct: Product = {
        ...productData,
        id: `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };

      setProducts((prevProducts) => [...prevProducts, newProduct]);

      setProductState({ loading: false, success: true, error: null });
      Alert.alert("Succès", "Produit créé avec succès");

      return { success: true, data: newProduct };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur lors de la création";
      setProductState({
        loading: false,
        success: false,
        error: errorMessage,
      });
      Alert.alert("Erreur", "Impossible de créer le produit");
      return { success: false, error: errorMessage };
    }
  };

  const getProductById = (id: string) => {
    console.log("Fetching product by ID:", products);
    return products.find((product) => product.id === id);
  };

  const getCategories = (): string[] => {
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    return categories.sort();
  };

  const getVendeurs = (): string[] => {
    const vendeurs = [
      ...new Set(products.map((product) => product.vendeur.name)),
    ];
    return vendeurs.sort();
  };

  const refreshProducts = () => {
    loadProducts();
  };

  return {
    products,
    filteredProducts,
    filters,

    productState,

    handleFilterChange,
    deleteProduct,
    updateProduct,
    createProduct,
    refreshProducts,

    getProductById,
    getCategories,
    getVendeurs,
  };
};
