import { View, Text } from "react-native";
import { Control, FieldErrors } from "react-hook-form";
import { ControlledInput, ControlledTextarea } from "@/components/forms";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import { ProductFormSchemaValues } from "@/schemas/product.schema";
import ControlledNumber from "./ControlledInput";

interface ProductFormSectionProps {
  control: Control<ProductFormSchemaValues>;
  errors: FieldErrors<ProductFormSchemaValues>;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  categories: string[];
}

export const ProductFormSection = ({
  control,
  errors,
  selectedCategory,
  onCategorySelect,
  categories,
}: ProductFormSectionProps) => {
  return (
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
        containerStyle="mb-6"
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark"
      />

      <ControlledNumber
        control={control}
        name="price"
        label="Prix (Ar) *"
        placeholder="0.00"
        error={errors.price?.message}
        containerStyle="mb-6"
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark"
      />

      <View className="mb-4">
        <Text className="text-sm font-medium text-foreground dark:text-foreground-dark mb-2">
          Catégorie *
        </Text>
        <View className="flex-1">
          <SelectDropdown
            label="Catégorie"
            options={categories}
            selected={selectedCategory}
            onSelect={onCategorySelect}
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
        containerStyle="mb-0"
        inputStyle="bg-input dark:bg-input-dark border-border dark:border-border-dark text-foreground dark:text-foreground-dark"
      />
    </View>
  );
};
