/* eslint-disable @typescript-eslint/no-unused-vars */
interface CarFormState {
  make: string;
  model: string;
  year: string;
  features: string;
  pricing: string;
  image: File | null;
  [key: string]: string | File | null;
}
