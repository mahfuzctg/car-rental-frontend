export interface TFormData {
  name: string;
  model: string;
  year: string;
  features: string; // A string that will be split into an array
  isElectric: string; // This can be "true" or "false"
  seatCapacity: string; // This can be parsed into a number
  date: string; // Date string
  image?: string; // Optional image URL
}
