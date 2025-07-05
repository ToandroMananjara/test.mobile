import { z } from "zod";

export const vendorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom du vendeur est requis"),
  email: z
    .string()
    .email("Email invalide")
    .min(1, "L'email du vendeur est requis"),
  phone: z.string().min(1, "Le téléphone du vendeur est requis"),
  address: z.string().min(1, "L'adresse du vendeur est requise"),
  profilePicture: z.string().optional(),
  isActive: z.boolean(),
});

export const productFormSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis"),
  price: z.string().min(1, "Le prix est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  description: z.string().optional(),
  image: z.string().optional(),
  vendor: vendorSchema,
});

export const productUpdateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Le nom du produit est requis"),
  price: z
    .string()
    .min(1, "Le prix est requis")
    .transform((val) => parseFloat(val))
    .refine(
      (val) => !isNaN(val) && val > 0,
      "Le prix doit être un nombre positif"
    ),
  category: z.string().min(1, "La catégorie est requise"),
  description: z.string().optional(),
  image: z.string().optional(),
  vendor: vendorSchema,
});

export type VendorSchemaValues = z.infer<typeof vendorSchema>;
export type ProductFormSchemaValues = z.infer<typeof productFormSchema>;
export type ProductUpdateSchemaValues = z.infer<typeof productUpdateSchema>;
