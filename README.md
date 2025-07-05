# Application Mobile E-commerce

Application mobile React Native développée avec Expo et TypeScript pour la gestion de produits et d'utilisateurs.

## Installation

### Prérequis

- Node.js (version 18+)
- npm ou yarn
- Expo CLI
- Application Expo Go sur smartphone

### Étapes d'installation

```bash
# Cloner le repository
git clone [URL_DU_REPO]
cd test.mobile

# Installer les dépendances
npm install

# Démarrer le projet
npx expo start
```

### Lancement sur mobile

1. Installer l'application **Expo Go** sur votre smartphone

   - iOS: App Store
   - Android: Google Play

2. Scanner le QR code affiché dans le terminal

3. En cas de problème réseau, utiliser le tunnel:
   ```bash
   npx expo start --tunnel
   ```

**Important**: Cette application est optimisée pour mobile uniquement. N'utilisez pas la version web.

## Architecture Technique

### Technologies utilisées

- **React Native** avec Expo
- **TypeScript** pour le typage
- **Expo Router** pour la navigation
- **NativeWind/Tailwind** pour le style
- **React Hook Form** pour les formulaires
- **Zod** pour la validation
- **AsyncStorage** pour la persistance

### Structure du projet

```
app/                    # Routes Expo Router
├── (auth)/            # Pages d'authentification
├── (tabs)/            # Navigation par onglets
└── products/          # Gestion des produits

components/            # Composants réutilisables
├── forms/            # Composants de formulaires
├── ui/               # Composants UI
└── profile/          # Composants profil

contexts/             # Contexts React
hooks/                # Hooks personnalisés
schemas/              # Schémas de validation Zod
types/                # Types TypeScript
```

## Fonctionnalités

### Authentification

- Inscription avec validation multi-étapes
- Connexion sécurisée
- Déconnexion
- Gestion de session persistante avec AsyncStorage
- Protection des routes par AuthGuard

### Gestion des produits

- Affichage de la liste des produits
- Création de nouveaux produits
- Modification des produits existants
- Suppression de produits
- Upload d'images avec ImagePicker
- Gestion des catégories
- Informations des vendeurs

### Profil utilisateur

- Affichage des informations personnelles
- Modification du profil
- Upload de photo de profil
- Validation en temps réel des formulaires

### Interface utilisateur

- Thème sombre/clair automatique
- Design responsive mobile-first
- Safe Area pour tous les écrans
- États de chargement et gestion d'erreurs
- Composants réutilisables

## Composants techniques

### Contexts React

- **AuthContext**: Gestion de l'authentification et de l'utilisateur
- **ProductsContext**: Gestion des produits et des opérations CRUD

### Hooks personnalisés

- **useAuthManager**: Gestion des états d'authentification
- **useProductManager**: Gestion des opérations sur les produits
- **useProfile**: Gestion du profil utilisateur
- **useSession**: Persistance des données avec AsyncStorage

### Composants de formulaires contrôlés

- **ControlledInput**: Champ de saisie avec validation
- **ControlledPassword**: Champ mot de passe avec affichage/masquage
- **ControlledTextarea**: Zone de texte multiligne
- **ControlledNumber**: Champ numérique
- **ControlledCheckbox**: Case à cocher
- **ImageUploader**: Upload d'images avec ImagePicker

### Composants UI réutilisables

- **PageHeader**: En-tête de page avec navigation
- **ActionButtons**: Boutons d'action standardisés
- **LoadingState**: États de chargement
- **ErrorState**: Gestion des erreurs
- **FormStepperWrapper**: Formulaire multi-étapes

### Validation avec Zod

- Schémas de validation pour les produits
- Schémas de validation pour les comptes utilisateur
- Validation en temps réel
- Messages d'erreur personnalisés
- Typage automatique TypeScript

### Persistance des données

- **AsyncStorage** pour la session utilisateur
- Sauvegarde automatique des données de connexion
- Restauration de session au démarrage
- Gestion sécurisée des tokens

### Navigation et protection

- **Expo Router** avec navigation basée sur les fichiers
- **AuthGuard** pour protéger les routes sensibles
- Navigation par onglets pour les pages principales
- Redirections automatiques selon l'état d'authentification

### Gestion des images

- **ImagePicker** pour sélectionner des images
- Support des permissions sur mobile
- Redimensionnement et optimisation automatique
- Prévisualisation en temps réel

## Structure des données

### Types principaux

- **User**: Informations utilisateur complètes
- **Product**: Données des produits avec vendeur
- **Vendor**: Informations des vendeurs
- **AuthState**: États d'authentification
- **Result**: Type de retour standardisé

### Validation

- Validation côté client avec Zod
- Contraintes de sécurité pour les mots de passe
- Validation email et téléphone
- Gestion des erreurs de validation

## Développement

### Commandes disponibles

```bash
# Démarrer en mode développement
npm start

# Démarrer sur Android
npm run android

# Démarrer sur iOS
npm run ios

# Tests
npm test
```

### Structure modulaire

- Composants découplés et réutilisables
- Hooks personnalisés pour la logique métier
- Contexts pour l'état global
- Typage strict avec TypeScript

### Gestion des thèmes

- Support automatique mode sombre/clair
- Palette de couleurs personnalisée avec Tailwind
- Composants adaptés aux deux thèmes
- Persistance des préférences utilisateur

## Support

En cas de problème:

1. Vérifier qu'Expo Go est installé sur le smartphone
2. S'assurer d'être sur le même réseau WiFi
3. Utiliser `--tunnel` si nécessaire
4. Consulter les logs dans le terminal
5. Utiliser `npx expo doctor` pour diagnostiquer les problèmes
