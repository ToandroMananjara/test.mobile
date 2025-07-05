import { z } from "zod";
const baseAccountSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  password: z
    .string({ required_error: "Le mot de passe est requis" })
    .min(8, "Veillez respecter les conditions du mot de passe")
    .regex(/[A-Z]/, "Veillez respecter les conditions du mot de passe")
    .regex(/\d/, "Veillez respecter les conditions du mot de passe")
    .regex(/[^A-Za-z0-9]/, "Veillez respecter les conditions du mot de passe"),
  confirmPassword: z.string().min(8, "Confirmez le mot de passe"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export const AccountSchema = baseAccountSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  }
);

export const AccountUpdateSchema = baseAccountSchema.omit({
  password: true,
  confirmPassword: true,
});
export type AccountSchemaValues = z.infer<typeof AccountSchema>;

export type AccountUpdateSchemaValues = z.infer<typeof AccountUpdateSchema>;
