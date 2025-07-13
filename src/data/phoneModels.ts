export interface PhoneModel {
  name: string;
  colors: string[];
  storageOptions: string[];
  basePrice: number;
  imageUrl: string;
}

export const phoneModels: PhoneModel[] = [
  {
    name: "iPhone 15 Pro Max",
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    storageOptions: ["256GB", "512GB", "1TB"],
    basePrice: 459900,
    imageUrl: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg"
  },
  {
    name: "iPhone 15 Pro",
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    basePrice: 389900,
    imageUrl: "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg"
  },
  {
    name: "iPhone 15 Plus",
    colors: ["Pink", "Yellow", "Green", "Blue", "Black"],
    storageOptions: ["128GB", "256GB", "512GB"],
    basePrice: 259900,
    imageUrl: "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg"
  },
  {
    name: "iPhone 15",
    colors: ["Pink", "Yellow", "Green", "Blue", "Black"],
    storageOptions: ["128GB", "256GB", "512GB"],
    basePrice: 229900,
    imageUrl: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg"
  },
  {
    name: "iPhone 14 Pro Max",
    colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    basePrice: 349900,
    imageUrl: "https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg"
  },
  {
    name: "iPhone 14 Pro",
    colors: ["Deep Purple", "Gold", "Silver", "Space Black"],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    basePrice: 299900,
    imageUrl: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg"
  },
  {
    name: "iPhone 14 Plus",
    colors: ["Purple", "Yellow", "Blue", "Midnight", "Starlight", "Red"],
    storageOptions: ["128GB", "256GB", "512GB"],
    basePrice: 229900,
    imageUrl: "https://images.pexels.com/photos/3999538/pexels-photo-3999538.jpeg"
  },
  {
    name: "iPhone 14",
    colors: ["Purple", "Yellow", "Blue", "Midnight", "Starlight", "Red"],
    storageOptions: ["128GB", "256GB", "512GB"],
    basePrice: 199900,
    imageUrl: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg"
  },
  {
    name: "iPhone 13",
    colors: ["Pink", "Blue", "Midnight", "Starlight", "Red"],
    storageOptions: ["128GB", "256GB", "512GB"],
    basePrice: 169900,
    imageUrl: "https://images.pexels.com/photos/1275229/pexels-photo-1275229.jpeg"
  },
  {
    name: "iPhone 12",
    colors: ["Purple", "Blue", "Green", "Black", "White", "Red"],
    storageOptions: ["64GB", "128GB", "256GB"],
    basePrice: 139900,
    imageUrl: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg"
  }
];

export const getStoragePriceMultiplier = (storage: string): number => {
  const multipliers: { [key: string]: number } = {
    "64GB": 1.0,
    "128GB": 1.0,
    "256GB": 1.1,
    "512GB": 1.25,
    "1TB": 1.5
  };
  return multipliers[storage] || 1.0;
};