import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function to combine and merge Tailwind CSS class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
