export interface Apartment {
  id: number;
  title: string;
  description: string;
  city: string;
  neighborhood: string;
  availableFrom: string;
  price: number;
  propertyType: "apartment" | "studio" | "room" | "house" | string;
  bathrooms: number;
  bedrooms: number;
  squareMeters: number;
  petFriendly?: boolean;
  images: string[];
  address: string;
  contact: string | number;
  new: boolean;
  lat: number;
  lng: number;
}
