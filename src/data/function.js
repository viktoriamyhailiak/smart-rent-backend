import fs from "fs";
import path from "path";

const filePath = path.resolve("src/data/apartmentsUA.json");
const apartmentsEN = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const changeData = (file) => {
  const types = ["квартира", "студія", "кімната", "будинок"];

  for (const apartment of file) {
    const foundType = types.find((type) =>
      apartment.title.toLowerCase().includes(type.toLowerCase())
    );

    if (foundType) {
      apartment.propertyType = foundType.toLowerCase();
      console.log(`Updated propertyType: ${apartment.propertyType}`);
    } else {
      console.log(`No type found in title: "${apartment.title}"`);
      // Якщо не знайшли, можна залишити як є або задати дефолт
      // apartment.propertyType = "apartment";
    }
  }
};

changeData(apartmentsEN);

// Перезапис у файл (якщо потрібно)
fs.writeFileSync(filePath, JSON.stringify(apartmentsEN, null, 2), "utf-8");
