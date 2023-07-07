import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const colorSwitch = (param: string, rarity: number | null) => {
  if (rarity === null) {
    return null;
  } else if (rarity < 0.1) {
    return `${param}-orange-100`;
  } else if (rarity >= 0.1 && rarity < 0.2) {
    return `${param}-orange-200`;
  } else if (rarity >= 0.2 && rarity < 0.3) {
    return `${param}-orange-300`;
  } else if (rarity >= 0.3 && rarity < 0.4) {
    return `${param}-orange-400`;
  } else if (rarity >= 0.4 && rarity < 0.5) {
    return `${param}-orange-500`;
  } else if (rarity >= 0.5 && rarity < 0.6) {
    return `${param}-orange-600`;
  } else if (rarity >= 0.6 && rarity < 0.7) {
    return `${param}-orange-700`;
  } else if (rarity >= 0.7 && rarity < 0.8) {
    return `${param}-orange-800`;
  } else if (rarity >= 0.8 && rarity < 0.9) {
    return `${param}-orange-900`;
  } else if (rarity >= 0.9) {
    return `${param}-orange-950`;
  }
};
