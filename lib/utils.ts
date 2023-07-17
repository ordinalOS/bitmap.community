import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colorSwitch = (param: string, rarity: number | null) => {
  if (rarity === null) {
    // return `${param}-orange-50`;
    return "#fff7ed";
  } else if (rarity < 0.1) {
    // return `${param}-orange-100`;
    return "#ffedd5";
  } else if (rarity >= 0.1 && rarity < 0.2) {
    // return `${param}-orange-200`;
    return "#fed7aa";
  } else if (rarity >= 0.2 && rarity < 0.3) {
    // return `${param}-orange-300`;
    return "#fdba74";
  } else if (rarity >= 0.3 && rarity < 0.4) {
    // return `${param}-orange-400`;
    return "#fb923c";
  } else if (rarity >= 0.4 && rarity < 0.5) {
    // return `${param}-orange-500`;
    return "#f97316";
  } else if (rarity >= 0.5 && rarity < 0.6) {
    // return `${param}-orange-600`;
    return "#ea580c";
  } else if (rarity >= 0.6 && rarity < 0.7) {
    // return `${param}-orange-700`;
    return "#c2410c";
  } else if (rarity >= 0.7 && rarity < 0.8) {
    // return `${param}-orange-800`;
    return "#9a3412";
  } else if (rarity >= 0.8 && rarity < 0.9) {
    // return `${param}-orange-900`;
    return "#7c2d12";
  } else if (rarity >= 0.9) {
    // return `${param}-orange-950`;
    return "#431407";
  } else {
    // return `${param}-orange-50`;
    return "#fff7ed";
  }
};

export const flattenObject = (obj: any) => {
  const flattened: { [key: string]: any } = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(flattened, flattenObject(value));
    } else {
      flattened[key] = value;
    }
  });

  return flattened;
};

export const numberFormatter = (number: number) =>
  parseFloat(number.toFixed(2)).toLocaleString("FR-fr").replace(",", ".");
