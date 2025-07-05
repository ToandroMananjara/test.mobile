import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const options = {
  title: "Gestion des produits",
};

export default function AddProductScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    seller: "",
  });
  const [image, setImage] = useState<string | null>(null);

  const handleSave = async () => {
    // Validation basique
    if (!formData.name || !formData.price) {
      Alert.alert("Erreur", "Veuillez remplir les champs obligatoires");
      return;
    }

    setLoading(true);

    try {
      // Simuler une sauvegarde
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert("Succès", "Produit ajouté avec succès", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors de l'ajout du produit"
      );
    } finally {
      setLoading(false);
    }
  };

  const selectImage = () => {
    // TODO: Intégrer avec expo-image-picker
    setImage("https://via.placeholder.com/300x200");
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView className="flex-1 bg-gray-50">
        {/* Header custom */}
        <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()} className="p-2 mr-2">
            <FontAwesome name="arrow-left" size={20} color="#3B82F6" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-gray-800 flex-1">
            Ajouter un produit
          </Text>
        </View>

        <View className="p-4">
          {/* Upload et prévisualisation d'image */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Image du produit
            </Text>
            <TouchableOpacity
              onPress={selectImage}
              className="h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center"
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  className="w-full h-full rounded-lg"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center">
                  <FontAwesome name="camera" size={32} color="#9CA3AF" />
                  <Text className="text-gray-500 mt-2">
                    Toucher pour ajouter une image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Formulaire */}
          <View className="space-y-4">
            {/* Nom du produit */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Nom du produit *
              </Text>
              <TextInput
                value={formData.name}
                onChangeText={(text) =>
                  setFormData({ ...formData, name: text })
                }
                placeholder="Entrez le nom du produit"
                className="border border-gray-300 rounded-lg px-3 py-3 text-base"
              />
            </View>

            {/* Prix */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Prix (€) *
              </Text>
              <TextInput
                value={formData.price}
                onChangeText={(text) =>
                  setFormData({ ...formData, price: text })
                }
                placeholder="0.00"
                keyboardType="numeric"
                className="border border-gray-300 rounded-lg px-3 py-3 text-base"
              />
            </View>

            {/* Catégorie */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Catégorie
              </Text>
              <TouchableOpacity className="border border-gray-300 rounded-lg px-3 py-3 flex-row justify-between items-center">
                <Text
                  className={
                    formData.category ? "text-gray-800" : "text-gray-400"
                  }
                >
                  {formData.category || "Sélectionner une catégorie"}
                </Text>
                <FontAwesome name="chevron-down" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Vendeur */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Vendeur
              </Text>
              <TouchableOpacity className="border border-gray-300 rounded-lg px-3 py-3 flex-row justify-between items-center">
                <Text
                  className={
                    formData.seller ? "text-gray-800" : "text-gray-400"
                  }
                >
                  {formData.seller || "Sélectionner un vendeur"}
                </Text>
                <FontAwesome name="chevron-down" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Description
              </Text>
              <TextInput
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                placeholder="Description détaillée du produit"
                multiline
                numberOfLines={4}
                className="border border-gray-300 rounded-lg px-3 py-3 text-base h-24"
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Boutons d'action */}
          <View className="flex-row mt-8 space-x-4">
            <TouchableOpacity
              className="flex-1 bg-gray-200 py-3 rounded-lg"
              onPress={() => router.back()}
            >
              <Text className="text-gray-700 font-semibold text-center">
                Annuler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 bg-blue-600 py-3 rounded-lg ${
                loading ? "opacity-50" : ""
              }`}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
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
