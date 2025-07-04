import { User } from "@/types/user.type";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    firstName: "Admin",
    lastName: "User",
    profileImage: "https://example.com/images/admin.jpg",
    phone: "0123456789",
    address: "456 Avenue des Champs-Élysées, 75008 Paris",
    createdAt: "2024-01-01T10:00:00Z", // Date de création du compte
  },
  {
    id: "2",
    email: "test@example.com",
    password: "password123",
    firstName: "John",
    lastName: "Doe",
    profileImage: "https://example.com/images/john.jpg", // URL de l'image de profil
    phone: "0123456789", // Numéro de téléphone
    address: "123 Rue de Paris, 75001 Paris", // Adresse de l'utilisateur
    createdAt: "2024-01-15T08:30:00Z",
  },
  {
    id: "3",
    email: "marie.martin@example.com",
    password: "marie2024",
    firstName: "Marie",
    lastName: "Martin",
    profileImage: "https://example.com/images/marie.jpg", // URL de l'image de profil
    phone: "0987654321", // Numéro de téléphone
    address: "789 Boulevard Saint-Germain, 75006 Paris", // Adresse de l'utilisateur
    createdAt: "2024-02-20T14:15:00Z",
  },
];

// Catégories de produits disponibles
export const categories = [
  "Tous", // Catégorie par défaut pour afficher tous les produits
  "Électronique",
  "Informatique",
  "Mode",
  "Audio",
  "Photo",
  "Électroménager",
  "Automobile",
  "Livres",
  "Jardin",
  "Sport",
  "Alimentation",
];

// Vendeurs disponibles (pour les filtres et la sélection)
export const vendors = [
  "TechStore Paris",
  "Mobile Expert",
  "Apple Store Lyon",
  "SportShop",
  "Audio Pro",
  "Photo Expert",
  "HomeAppliances",
  "Tesla Accessories",
  "TechBooks",
  "Green Paradise",
  "SportTech",
  "Coffee Roasters",
];

// Données pour les statistiques (optionnel)
export const statsData = {
  totalProducts: 12,
  totalCategories: 11,
  totalVendors: 12,
  averagePrice: 628.32,
  totalStock: 240,
  lastUpdate: "2024-12-03T10:45:00Z",
};

// Configuration par défaut de l'app
export const appConfig = {
  appName: "ProductManager",
  version: "1.0.0",
  defaultCurrency: "EUR",
  defaultLanguage: "fr",
  itemsPerPage: 10,
  maxUploadSize: 5 * 1024 * 1024, // 5MB
  supportedImageFormats: [".jpg", ".jpeg", ".png", ".webp"],
  features: {
    enableSearch: true,
    enableFilters: true,
    enableImageUpload: true,
    enableUserProfiles: true,
    enableStatistics: true,
  },
};

// Messages d'erreur et de succès
export const messages = {
  auth: {
    loginSuccess: "Connexion réussie !",
    loginError: "Email ou mot de passe incorrect",
    logoutSuccess: "Déconnexion réussie",
    registerSuccess: "Inscription réussie !",
    registerError: "Erreur lors de l'inscription",
    emailRequired: "L'email est requis",
    passwordRequired: "Le mot de passe est requis",
    nameRequired: "Le nom est requis",
  },
  products: {
    addSuccess: "Produit ajouté avec succès !",
    updateSuccess: "Produit mis à jour avec succès !",
    deleteSuccess: "Produit supprimé avec succès !",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer ce produit ?",
    noProducts: "Aucun produit trouvé",
    loadError: "Erreur lors du chargement des produits",
  },
  validation: {
    nameRequired: "Le nom du produit est requis",
    priceRequired: "Le prix est requis",
    priceInvalid: "Le prix doit être un nombre positif",
    stockRequired: "Le stock est requis",
    stockInvalid: "Le stock doit être un nombre entier positif",
    categoryRequired: "La catégorie est requise",
    vendorRequired: "Le vendeur est requis",
    imageInvalid: "L'URL de l'image n'est pas valide",
  },
};

export default {
  mockUsers,
  categories,
  vendors,
  statsData,
  appConfig,
  messages,
};
