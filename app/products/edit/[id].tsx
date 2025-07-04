import { View, Text, ScrollView } from "react-native";

export default function EditProductScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6 bg-white">
        <Text>Modifier produits</Text>
      </View>
    </ScrollView>
  );
}
