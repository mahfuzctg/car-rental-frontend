import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Consider token expired if there's an error
  }
};
