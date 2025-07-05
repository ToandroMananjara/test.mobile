import { View, ScrollView, Alert } from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ImageUploader,
  ProductFormSection,
  VendorFormSection,
} from "@/components/forms";
import {
  productFormSchema,
  type ProductFormSchemaValues,
} from "@/schemas/product.schema";
import { useProductsContext } from "@/contexts/ProductsContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { ActionButtons } from "@/components/ui/ActionButtons";
export const options = { title: "Gestion des produits" };
export default function AddProductScreen() {
  const router = useRouter();
  const { addProduct, loading } = useProductsContext();
  const [image, setImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = [
    "Électronique",
    "Vêtements",
    "Maison & Jardin",
    "Sports & Loisirs",
    "Livres",
    "Beauté & Santé",
  ];
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormSchemaValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "Produit exemple",
      price: "15000",
      category: "Électronique",
      description: "Un produit électronique de qualité.",
      image: "",
      vendor: {
        id: "",
        name: "Vendeur Démo",
        email: "vendeur@exemple.com",
        phone: "0341234567",
        address: "Antananarivo",
        profilePicture: "",
        isActive: true,
      },
    },
  });
  const handleSave = async (data: ProductFormSchemaValues) => {
    try {
      const productData = { ...data, image };
      const result = await addProduct(productData);
      if (result.success) {
        Alert.alert("Succès", "Produit ajouté avec succès", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert(
          "Erreur",
          result.error || "Une erreur s'est produite lors de l'ajout du produit"
        );
      }
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de l'ajout du produit"
      );
    }
  };
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setValue("category", category);
  };
  const handleImageSelected = (uri: string) => {
    setImage(uri);
    setValue("image", uri);
  };
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-background dark:bg-background-dark">
        <PageHeader title="Ajouter un produit" />
        <ScrollView className="flex-1">
          <View className="p-4">
            <ImageUploader
              image={image}
              onImageSelected={handleImageSelected}
            />
            <ProductFormSection
              control={control}
              errors={errors}
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
              categories={categories}
            />
            <VendorFormSection control={control} errors={errors} />
            <ActionButtons
              onCancel={() => router.back()}
              onSave={handleSubmit(handleSave)}
              loading={loading}
              saveText="Ajouter"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
