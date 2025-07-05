import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { ControlledInput, ControlledTextarea } from "@/components/forms";
import {
  productFormSchema,
  type ProductFormSchemaValues,
} from "@/schemas/product.schema";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { useProductsContext } from "@/contexts/ProductsContext";

export const options = {
  title: "Gestion des produits",
};

export default function AddProductScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { addProduct, loading } = useProductsContext();
  const [image, setImage] = useState<string | null>(null);

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

  const selectImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Nous avons besoin de votre permission pour accéder à vos photos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sélectionner une image");
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    "Électronique",
    "Vêtements",
    "Maison & Jardin",
    "Sports & Loisirs",
    "Livres",
    "Beauté & Santé",
  ];

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-row items-center px-4 py-5 bg-card dark:bg-card-dark border-b border-border dark:border-border-dark">
        <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
          <FontAwesome
            name="arrow-left"
            size={20}
            color={isDark ? "#60A5FA" : "#3B82F6"}
          />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-foreground dark:text-foreground-dark flex-1">
          Ajouter un produit
        </Text>
      </View>
      <ScrollView className="flex-1 bg-background dark:bg-background-dark">
        <View className="p-4">
          <View className="mb-6">
            <Text className="text-sm font-medium text-foreground dark:text-foreground-dark mb-2">
              Image du produit
            </Text>
            <TouchableOpacity
              onPress={selectImage}
              className="h-48 bg-muted dark:bg-muted-dark border-2 border-dashed border-border dark:border-border-dark rounded-lg items-center justify-center"
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center">
                  <FontAwesome
                    name="camera"
                    size={32}
                    color={isDark ? "#9CA3AF" : "#6B7280"}
                  />
                  <Text className="text-muted-foreground dark:text-muted-foreground-dark mt-2">
                    Toucher pour ajouter une image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View className="rounded-lg p-4 mb-4 shadow-sm bg-card dark:bg-card-dark border border-border dark:border-border-dark">
            <Text className="text-lg font-semibold mb-4 text-foreground dark:text-foreground-dark">
              Informations du produit
            </Text>

            <ControlledInput
              control={control}
              name="name"
              label="Nom du produit *"
              placeholder="Entrez le nom du produit"
              error={errors.name?.message}
            />

            <ControlledInput
              control={control}
              name="price"
              label="Prix (Ar) *"
              placeholder="0.00"
              keyboardType="numeric"
              error={errors.price?.message}
            />

            <View className="mb-4">
              <Text className="text-sm font-medium text-foreground dark:text-foreground-dark mb-2">
                Catégorie *
              </Text>
              <View className="flex-1 ">
                <SelectDropdown
                  label="Catégorie"
                  options={categories}
                  selected={selectedCategory}
                  onSelect={(category) => {
                    setSelectedCategory(category);
                    setValue("category", category);
                  }}
                />
              </View>

              {errors.category && (
                <Text className="text-destructive dark:text-destructive-dark text-sm mt-1">
                  {errors.category.message}
                </Text>
              )}
            </View>

            <ControlledTextarea
              control={control}
              name="description"
              label="Description"
              placeholder="Description détaillée du produit"
              numberOfLines={4}
              error={errors.description?.message}
            />
          </View>

          <View className="rounded-lg p-4 mb-4 shadow-sm bg-card dark:bg-card-dark border border-border dark:border-border-dark">
            <Text className="text-lg font-semibold mb-4 text-foreground dark:text-foreground-dark">
              Informations du vendeur
            </Text>

            <ControlledInput
              control={control}
              name="vendor.name"
              label="Nom du vendeur *"
              placeholder="Entrez le nom du vendeur"
              error={errors.vendor?.name?.message}
            />

            <ControlledInput
              control={control}
              name="vendor.email"
              label="Email *"
              placeholder="vendeur@email.com"
              keyboardType="email-address"
              error={errors.vendor?.email?.message}
            />

            <ControlledInput
              control={control}
              name="vendor.phone"
              label="Téléphone *"
              placeholder="Numéro de téléphone"
              keyboardType="phone-pad"
              error={errors.vendor?.phone?.message}
            />

            <ControlledTextarea
              control={control}
              name="vendor.address"
              label="Adresse *"
              placeholder="Adresse complète du vendeur"
              numberOfLines={3}
              error={errors.vendor?.address?.message}
            />
          </View>

          <View className="flex-row mt-8 gap-4">
            <TouchableOpacity
              className="flex-1 bg-muted dark:bg-muted-dark py-3 rounded-lg border border-border dark:border-border-dark"
              onPress={() => router.back()}
            >
              <Text className="text-muted-foreground dark:text-muted-foreground-dark font-semibold text-center">
                Annuler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 bg-primary dark:bg-primary-dark py-3 rounded-lg ${
                loading ? "opacity-50" : ""
              }`}
              onPress={handleSubmit(handleSave)}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-semibold text-center">
                  Sauvegarder
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
