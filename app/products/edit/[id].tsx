import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  Text,
  useColorScheme,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

export default function EditProductScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const { updateProduct, getProductById, loading } = useProductsContext();
  const [image, setImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productLoading, setProductLoading] = useState(true);

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
    reset,
    formState: { errors },
  } = useForm<ProductFormSchemaValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: "",
      category: "",
      description: "",
      image: "",
      vendor: {
        id: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        profilePicture: "",
        isActive: true,
      },
    },
  });

  useEffect(() => {
    if (id) {
      const product = getProductById(id);
      if (product) {
        reset({
          name: product.name,
          price: product.price.toString(),
          category: product.category,
          description: product.description,
          image: product.image || "",
          vendor: product.vendeur,
        });
        setImage(product.image || null);
        setSelectedCategory(product.category);
      } else {
        Alert.alert("Erreur", "Produit non trouvé", [
          { text: "OK", onPress: () => router.back() },
        ]);
      }
      setProductLoading(false);
    }
  }, [id, getProductById, reset]);

  const handleSave = async (data: ProductFormSchemaValues) => {
    if (!id) return;

    try {
      const productData = { ...data, image };
      const result = await updateProduct(id, productData);

      if (result.success) {
        Alert.alert("Succès", "Produit modifié avec succès", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Erreur", result.error || "Erreur lors de la modification");
      }
    } catch (error) {
      Alert.alert("Erreur", "Erreur lors de la modification du produit");
    }
  };

  const handleImageSelected = (uri: string) => {
    setImage(uri);
    setValue("image", uri);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setValue("category", category);
  };

  if (productLoading) {
    return (
      <View
        className="flex-1 justify-center items-center bg-background dark:bg-background-dark"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      >
        <ActivityIndicator
          size="large"
          color={isDark ? "#60A5FA" : "#3B82F6"}
        />
        <Text className="mt-4 text-lg text-foreground dark:text-foreground-dark">
          Chargement du produit...
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        className="flex-1 bg-background dark:bg-background-dark"
        style={{ paddingTop: insets.top }}
      >
        <PageHeader title="Modifier le produit" />
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            paddingBottom: Math.max(20, insets.bottom),
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="p-4">
            <ImageUploader
              image={image}
              onImageSelected={handleImageSelected}
              placeholder="Toucher pour modifier l'image"
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
              saveText="Modifier"
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}
