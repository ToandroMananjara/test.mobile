import { View, Text } from "react-native";
import { Control, FieldErrors } from "react-hook-form";
import { ControlledInput, ControlledTextarea } from "@/components/forms";
import { AccountUpdateSchemaValues } from "@/schemas/account.schema";

interface ProfileFormProps {
  control: Control<AccountUpdateSchemaValues>;
  errors: FieldErrors<AccountUpdateSchemaValues>;
  isEditing: boolean;
}

export function ProfileForm({ control, errors, isEditing }: ProfileFormProps) {
  return (
    <View className="rounded-2xl p-6 mb-6 shadow-sm bg-card dark:bg-card-dark border border-border dark:border-border-dark">
      <Text className="text-xl font-bold mb-6 text-foreground dark:text-foreground-dark">
        Informations personnelles
      </Text>

      <ControlledInput
        control={control}
        name="lastName"
        label="Nom"
        placeholder="Entrez votre nom"
        editable={isEditing}
        error={errors.lastName?.message}
      />

      <ControlledInput
        control={control}
        name="firstName"
        label="Prénom"
        placeholder="Entrez votre prénom"
        editable={isEditing}
        error={errors.firstName?.message}
      />

      <ControlledInput
        control={control}
        name="email"
        label="Email"
        placeholder="Entrez votre email"
        keyboardType="email-address"
        editable={isEditing}
        error={errors.email?.message}
      />

      <ControlledInput
        control={control}
        name="phone"
        label="Téléphone"
        placeholder="Entrez votre numéro de téléphone"
        keyboardType="phone-pad"
        editable={isEditing}
        error={errors.phone?.message}
      />

      <ControlledTextarea
        control={control}
        name="address"
        label="Adresse"
        placeholder="Entrez votre adresse complète"
        editable={isEditing}
        error={errors.address?.message}
        numberOfLines={3}
      />
    </View>
  );
}
