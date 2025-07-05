import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Portal } from "react-native-paper";
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
  const [buttonLayout, setButtonLayout] = React.useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const screenHeight = Dimensions.get("window").height;
  const buttonRef = React.useRef<View>(null);

  const handleOpen = () => {
    if (buttonRef.current) {
      buttonRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setButtonLayout({ x, y, width, height });
          setOpen(true);
        }
      );
    }
  };

  const dropdownTop = buttonLayout.y + buttonLayout.height;

  return (
    <View>
      <TouchableOpacity
        ref={buttonRef}
        className="flex-row items-center justify-between border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-3 rounded-lg"
        onPress={handleOpen}
        activeOpacity={0.8}
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
        <Portal>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 998,
            }}
          />

          <View
            style={{
              position: "absolute",
              top: dropdownTop + 28,
              left: buttonLayout.x,
              width: buttonLayout.width,
              maxHeight: Math.min(250, screenHeight - dropdownTop - 20),
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: isDark ? "#374151" : "#e5e7eb",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 5,
              elevation: 10,
              zIndex: 999,
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                  style={{
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    backgroundColor:
                      item === selected
                        ? isDark
                          ? "#1e40af20"
                          : "#dbeafe"
                        : "transparent",
                    borderBottomWidth: index !== options.length - 1 ? 1 : 0,
                    borderBottomColor: isDark ? "#374151" : "#f3f4f6",
                  }}
                >
                  <Text
                    style={{
                      color:
                        item === selected
                          ? isDark
                            ? "#60a5fa"
                            : "#2563eb"
                          : isDark
                          ? "#f9fafb"
                          : "#111827",
                      fontWeight: item === selected ? "600" : "400",
                    }}
                  >
                    {item === "all" ? `Tous les ${label.toLowerCase()}s` : item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Portal>
      )}
    </View>
  );
};
