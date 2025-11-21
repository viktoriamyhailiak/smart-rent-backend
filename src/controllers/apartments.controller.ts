import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const apartmentsENPath = path.resolve(__dirname, "../data/apartmentsEN.json");
const apartmentsEN = JSON.parse(fs.readFileSync(apartmentsENPath, "utf-8"));
const apartmentsUAPath = path.resolve(__dirname, "../data/apartmentsUA.json");
const apartmentsUA = JSON.parse(fs.readFileSync(apartmentsUAPath, "utf-8"));

export const getAllApartments = (req: Request, res: Response) => {
  const lang = req.query.lang;

  if (
    lang?.toString().toLocaleLowerCase() === "ua" ||
    lang?.toString().toLocaleLowerCase() === "uk"
  ) {
    res.json(apartmentsUA);
  } else {
    res.json(apartmentsEN);
  }
};
