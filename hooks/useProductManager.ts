import { useState, useEffect } from "react";
import type { Product } from "@/types/product.type";
import type { ProductFormSchemaValues } from "@/schemas/product.schema";
import productsData from "@/data/products.json";

export const useProductManager = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Charger les données initiales depuis le fichier JSON
  useEffect(() => {
    setProducts(productsData as Product[]);
  }, []);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const addProduct = async (
    productData: ProductFormSchemaValues
  ): Promise<{ success: boolean; data?: Product; error?: string }> => {
    setLoading(true);
    try {
      // Simuler un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newProduct: Product = {
        id: generateId(),
        name: productData.name,
        price: parseFloat(productData.price),
        description: productData.description ?? "",
        category: productData.category,
        image:
          productData.image ||
          "https://picsum.photos/400/300?random=" +
            Math.floor(Math.random() * 100),
        vendeur: productData.vendor, // Adapter vendor -> vendeur
        stock: 1, // Valeur par défaut
        isActive: true,
      };

      setProducts((prev) => [newProduct, ...prev]);

      return { success: true, data: newProduct };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erreur lors de l'ajout";
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (
    id: string,
    productData: Partial<ProductFormSchemaValues>
  ): Promise<{ success: boolean; data?: Product; error?: string }> => {
    setLoading(true);
    try {
      // Simuler un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 800));

      const productIndex = products.findIndex((p) => p.id === id);
      if (productIndex === -1) {
        return { success: false, error: "Produit non trouvé" };
      }

      const updatedProduct: Product = {
        ...products[productIndex],
        ...productData,
        price: productData.price
          ? parseFloat(productData.price)
          : products[productIndex].price,
        vendeur: productData.vendor || products[productIndex].vendeur,
      };

      const newProducts = [...products];
      newProducts[productIndex] = updatedProduct;
      setProducts(newProducts);

      return { success: true, data: updatedProduct };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de la modification";
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (
    id: string
  ): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      // Simuler un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 500));

      const productExists = products.some((p) => p.id === id);
      if (!productExists) {
        return { success: false, error: "Produit non trouvé" };
      }

      setProducts((prev) => prev.filter((p) => p.id !== id));

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erreur lors de la suppression";
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getProductById = (id: string): Product | undefined => {
    return products.find((p) => p.id === id);
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  };
};
