export type Vendor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
  isActive: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  vendeur: Vendor;
  image: string;
  isActive: boolean;
};
