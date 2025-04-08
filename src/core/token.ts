import { jwtDecode } from "jwt-decode";

export default function getUsernameFromToken(token: string): string | null {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.sub;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
