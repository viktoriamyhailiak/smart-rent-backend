import fs from "fs";
import path from "path";

interface Apartment {
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
  lat?: number | null;
  lng?: number | null;
}

async function getCoordinates(address: string, city: string) {
  const queries = [
    `${address}, ${city}, Ukraine`, 
    `${address.split(",")[0]}, ${city}`,
    city,
  ];

  for (const q of queries) {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        q
      )}&key=6c5630978ec24628aaf51fc0ed26c226&language=uk&limit=1`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return {
          lat: data.results[0].geometry.lat,
          lng: data.results[0].geometry.lng,
        };
      }
    } catch (err) {
      console.warn("Failed query:", q, err);
    }
  }

  console.warn("No results for:", address);
  return { lat: null, lng: null };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function geocodeApartments(apartments: Apartment[]) {
  for (const apt of apartments) {
    const coords = await getCoordinates(apt.address, apt.city);
    apt.lat = coords.lat;
    apt.lng = coords.lng;
    console.log(`Geocoded ${apt.address}:`, coords);
    await sleep(1000);
  }
}

(async () => {
  const filePath = path.resolve("./src/data/apartmentsUA.json");
  const apartsData = fs.readFileSync(filePath, "utf-8");
  const apartments: Apartment[] = JSON.parse(apartsData).map((apt: any) => ({
    ...apt,
    propertyType: "apartment" as "apartment",
  }));

  await geocodeApartments(apartments);

  fs.writeFileSync(filePath, JSON.stringify(apartments, null, 2), "utf-8");
})();
