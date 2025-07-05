import React, { createContext, useContext, ReactNode } from "react";
import type { Product } from "@/types/product.type";
import { useProductManager } from "@/hooks/useProductManager";

export type ProductsContextType = {
  products: Product[];
  loading: boolean;
  addProduct: (
    productData: any
  ) => Promise<{ success: boolean; data?: Product; error?: string }>;
  updateProduct: (
    id: string,
    productData: any
  ) => Promise<{ success: boolean; data?: Product; error?: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; error?: string }>;
  getProductById: (id: string) => Product | undefined;
};

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
  } = useProductManager();

  return (
    <ProductsContext.Provider
      value={{
        products,
        loading,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProductsContext must be used within ProductsProvider");
  }
  return context;
};
