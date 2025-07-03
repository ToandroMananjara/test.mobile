import { Text, View } from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";

export default function TabOneScreen() {
  console.log("Home page");
  return (
    <View className="flex-1 items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100">
      <Text>Bienvenue sur l'app gestion de produit</Text>
    </View>
  );
}
