import React from "react";
import { Alert, View, Text, Platform, useColorScheme } from "react-native";
import { Tabs, router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useAuth } from "@/contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabBarIcon = (
  name: React.ComponentProps<typeof FontAwesome>["name"],
  label: string
) => {
  return ({ focused }: { focused: boolean }) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 4,
          minWidth: 60,
        }}
      >
        <FontAwesome
          name={name}
          size={Platform.OS === "web" ? 20 : 22}
          color={
            focused
              ? isDark
                ? "#60A5FA"
                : "#3B82F6"
              : isDark
              ? "#9CA3AF"
              : "#6B7280"
          }
        />
        <Text
          style={{
            fontSize: Platform.OS === "web" ? 11 : 12,
            marginTop: 3,
            color: focused
              ? isDark
                ? "#60A5FA"
                : "#3B82F6"
              : isDark
              ? "#9CA3AF"
              : "#6B7280",
            fontWeight: focused ? "600" : "400",
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    );
  };
};

export default function TabLayout() {
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Voulez-vous vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Se déconnecter",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut();
            router.replace("/auth/login");
          } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
            Alert.alert(
              "Erreur",
              "Une erreur est survenue lors de la déconnexion"
            );
          }
        },
      },
    ]);
  };

  // Configuration adaptative pour web et mobile avec support du thème
  const tabBarStyleConfig = Platform.select({
    web: {
      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
      borderTopColor: isDark ? "#374151" : "#E5E7EB",
      borderTopWidth: 1,
      height: 65,
      paddingBottom: 8,
      paddingTop: 8,
      position: "fixed" as const,
      bottom: 0,
      left: 0,
      right: 0,
    },
    default: {
      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
      borderTopColor: isDark ? "#374151" : "#E5E7EB",
      borderTopWidth: 1,
      height: 65 + insets.bottom,
      paddingBottom: Math.max(insets.bottom, 8),
      paddingTop: 8,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
    },
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: useClientOnlyValue(false, true),
        tabBarShowLabel: false,
        tabBarStyle: tabBarStyleConfig,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: isDark ? "#60A5FA" : "#3B82F6",
        tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Produits",
          tabBarIcon: tabBarIcon("shopping-bag", "Produits"),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Ajouter",
          tabBarIcon: tabBarIcon("plus", "Ajouter"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: tabBarIcon("user", "Profil"),
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Déconnexion",
          tabBarIcon: tabBarIcon("sign-out", "Quitter"),
          headerShown: false,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            handleLogout();
          },
        }}
      />
    </Tabs>
  );
}
