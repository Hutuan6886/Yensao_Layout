//todo: install clsx and tailwind-merge for cn() (npm install clsx tailwind-merge)
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatterCurrency = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const formatterCurrencyInput = new Intl.NumberFormat("vi-VN", {
  currency: "VND",
});
