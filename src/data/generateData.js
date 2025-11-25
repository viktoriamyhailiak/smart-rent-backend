import fs from "fs";
import path from "path";

const filePath = path.resolve("src/data/apartmentsEN.json");
const apartments = JSON.parse(fs.readFileSync(filePath, "utf-8"));

const citiesDict = {
  kyiv: {
    ENG: "Kyiv",
    UA: "Київ",
    ES: "Kyiv",
    DE: "Kiew",
    IT: "Kiev",
    FR: "Kyiv",
  },
  lviv: {
    ENG: "Lviv",
    UA: "Львів",
    ES: "Lviv",
    DE: "Lemberg",
    IT: "Leopoli",
    FR: "Lviv",
  },
  dnipro: {
    ENG: "Dnipro",
    UA: "Дніпро",
    ES: "Dnipro",
    DE: "Dnipro",
    IT: "Dnipro",
    FR: "Dnipro",
  },
  odesa: {
    ENG: "Odesa",
    UA: "Одеса",
    ES: "Odesa",
    DE: "Odessa",
    IT: "Odessa",
    FR: "Odessa",
  },
  kharkiv: {
    ENG: "Kharkiv",
    UA: "Харків",
    ES: "Járkov",
    DE: "Charkiw",
    IT: "Kharkiv",
    FR: "Kharkiv",
  },
  vinnytsia: {
    ENG: "Vinnytsia",
    UA: "Вінниця",
    ES: "Vinnytsia",
    DE: "Winnyzja",
    IT: "Vinnytsia",
    FR: "Vinnytsia",
  },
  ternopil: {
    ENG: "Ternopil",
    UA: "Тернопіль",
    ES: "Ternópil",
    DE: "Ternopil",
    IT: "Ternopil",
    FR: "Ternopil",
  },
  "ivano-frankivsk": {
    ENG: "Ivano-Frankivsk",
    UA: "Івано-Франківськ",
    ES: "Ivano-Frankivsk",
    DE: "Iwano-Frankiwsk",
    IT: "Ivano-Frankivsk",
    FR: "Ivano-Frankivsk",
  },
  zaporizhzhia: {
    ENG: "Zaporizhzhia",
    UA: "Запоріжжя",
    ES: "Zaporiyia",
    DE: "Saporischschja",
    IT: "Zaporizhia",
    FR: "Zaporizhzhia",
  },
  chernihiv: {
    ENG: "Chernihiv",
    UA: "Чернігів",
    ES: "Chernígov",
    DE: "Tschernihiw",
    IT: "Černihiv",
    FR: "Tchernihiv",
  },
};

function normalizeCities(apartments) {
  apartments.forEach((apt) => {
    if (!apt.city) return;

    // якщо city рядок, беремо його
    let cityKey =
      typeof apt.city === "string"
        ? apt.city.trim().toLowerCase()
        : apt.city.ENG?.trim().toLowerCase();

    if (!cityKey || !citiesDict[cityKey]) {
      console.warn(`City not found for apartment id ${apt.id}: ${apt.city}`);
      return;
    }

    // замінюємо city на об’єкт з перекладеними значеннями
    apt.city = { ...citiesDict[cityKey] };
  });
}

// нормалізуємо
normalizeCities(apartments);

// зберігаємо результат
fs.writeFileSync(
  path.resolve("src/data/apartmentsEN.json"),
  JSON.stringify(apartments, null, 2),
  "utf-8"
);

console.log("Cities normalized ✅");
