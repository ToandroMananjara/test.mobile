import { z } from "zod";

// Schéma pour les vendeurs
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

// Schéma pour les formulaires (avec price en string)
export const productFormSchema = z.object({
  name: z.string().min(1, "Le nom du produit est requis"),
  price: z.string().min(1, "Le prix est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  description: z.string().optional(),
  image: z.string().optional(),
  vendor: vendorSchema,
});

// Schéma pour créer un nouveau produit (avec transformation)
export const productSchema = z.object({
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

// Schéma pour mettre à jour un produit
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

// Types TypeScript dérivés des schémas
export type VendorSchemaValues = z.infer<typeof vendorSchema>;
export type ProductFormSchemaValues = z.infer<typeof productFormSchema>;
export type ProductSchemaValues = z.infer<typeof productSchema>;
export type ProductUpdateSchemaValues = z.infer<typeof productUpdateSchema>;
