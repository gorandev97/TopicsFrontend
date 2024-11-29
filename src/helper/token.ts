import { jwtDecode } from "jwt-decode";

// Define a type for your token payload (optional, for TypeScript users)
interface TokenPayload {
  email: string;
  id: string;
  profilePicture: string;
}

// Function to decode the token
export const getDecodedToken = (): TokenPayload | null => {
  const token = localStorage.getItem("userToken"); // Or sessionStorage
  if (!token) return null;

  try {
    const decoded: TokenPayload = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
