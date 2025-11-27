export type MultiLangText = {
  ENG: string;
  UA: string;
  DE: string;
  FR: string;
  IT: string;
  ES: string;
};

export type Landlord = {
  name: MultiLangText;
  gender: "m" | "f";
  rate: number;
};

export type Apartment = {
  id: number;
  title: MultiLangText;
  description: MultiLangText;
  city: MultiLangText;
  address: MultiLangText;
  neighborhood: MultiLangText;
  propertyType: MultiLangText;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  contact: string;
  petFriendly: boolean;
  availableFrom: string;
  new: boolean;
  images: string[];
  lat: number;
  lng: number;
  landlord: Landlord;
  utilitiesPerMonth: number;
  tenantProtection: number;
};
