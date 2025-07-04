import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useColorScheme } from "@/components/useColorScheme";

type Props = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export const SelectDropdown = ({
  label,
  options,
  selected,
  onSelect,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const [buttonLayout, setButtonLayout] = React.useState({ y: 0, height: 0 });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const screenHeight = Dimensions.get("window").height;

  const handleLayout = (event: any) => {
    const { y, height } = event.nativeEvent.layout;
    setButtonLayout({ y, height });
  };

  const dropdownTop = buttonLayout.y + buttonLayout.height + 5;
  const dropdownMaxHeight = screenHeight - dropdownTop - 100;

  return (
    <View className="flex-1 relative">
      <TouchableOpacity
        className="flex-row items-center justify-between border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-3 rounded-lg"
        onPress={() => setOpen(!open)}
        onLayout={handleLayout}
      >
        <Text
          className="text-gray-900 dark:text-gray-100 flex-1"
          numberOfLines={1}
        >
          {selected === "all" ? label : selected}
        </Text>
        <FontAwesome
          name={open ? "chevron-up" : "chevron-down"}
          size={12}
          color={isDark ? "#9CA3AF" : "#6B7280"}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>

      {open && (
        <>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: -1000,
              left: -1000,
              right: -1000,
              bottom: -1000,
              zIndex: 5,
              elevation: 5,
            }}
            onPress={() => setOpen(false)}
          />

          <View
            style={{
              position: "absolute",
              top: dropdownTop,
              left: 0,
              right: 0,
              maxHeight: dropdownMaxHeight,
              zIndex: 5,
              elevation: 5,
            }}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  className={`px-3 py-3 ${
                    index !== options.length - 1
                      ? "border-b border-gray-100 dark:border-gray-700"
                      : ""
                  } ${
                    item === selected ? "bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  <Text
                    className={`${
                      item === selected
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {item === "all" ? `Tous les ${label.toLowerCase()}s` : item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </>
      )}
    </View>
  );
};
