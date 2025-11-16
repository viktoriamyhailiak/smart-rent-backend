var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import path from "path";
function getCoordinates(address, city) {
    return __awaiter(this, void 0, void 0, function* () {
        const queries = [
            `${address}, ${city}, Ukraine`,
            `${address.split(",")[0]}, ${city}`,
            city,
        ];
        for (const q of queries) {
            try {
                const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(q)}&key=6c5630978ec24628aaf51fc0ed26c226&language=uk&limit=1`;
                const response = yield fetch(url);
                const data = yield response.json();
                if (data.results && data.results.length > 0) {
                    return {
                        lat: data.results[0].geometry.lat,
                        lng: data.results[0].geometry.lng,
                    };
                }
            }
            catch (err) {
                console.warn("Failed query:", q, err);
            }
        }
        console.warn("No results for:", address);
        return { lat: null, lng: null };
    });
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function geocodeApartments(apartments) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const apt of apartments) {
            const coords = yield getCoordinates(apt.address, apt.city);
            apt.lat = coords.lat;
            apt.lng = coords.lng;
            console.log(`Geocoded ${apt.address}:`, coords);
            yield sleep(1000);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const filePath = path.resolve("./src/data/apartmentsUA.json");
    const apartsData = fs.readFileSync(filePath, "utf-8");
    const apartments = JSON.parse(apartsData).map((apt) => (Object.assign(Object.assign({}, apt), { propertyType: "apartment" })));
    yield geocodeApartments(apartments);
    fs.writeFileSync(filePath, JSON.stringify(apartments, null, 2), "utf-8");
}))();
