export interface Apartment {
  id: number;
  city: string;
  neighborhood: string;
  availableFrom: string;
  priceUsd: number;
  propertyType: "apartment" | "studio" | "room" | "house";
  bathrooms: number;
  bedrooms: number;
  squareMeters: number;
  petFriendly?: boolean;
  images: string[];
}
