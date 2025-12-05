import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const apartmentsPath = path.resolve(__dirname, "../data/apartments.json");
const apartments = JSON.parse(fs.readFileSync(apartmentsPath, "utf-8"));

export const getAllApartments = (req: Request, res: Response) => {
  res.json(apartments);
};
