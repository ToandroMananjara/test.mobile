import { View, Text } from "react-native";
import { Control, FieldErrors } from "react-hook-form";
import { ControlledInput, ControlledTextarea } from "@/components/forms";
import { ProductFormSchemaValues } from "@/schemas/product.schema";

interface VendorFormSectionProps {
  control: Control<ProductFormSchemaValues>;
  errors: FieldErrors<ProductFormSchemaValues>;
}

export const VendorFormSection = ({
  control,
  errors,
}: VendorFormSectionProps) => {
  return (
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
        placeholder="0341234567"
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
  );
};
