import { jwtDecode } from "jwt-decode";

const BACKEND_URL = String(import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");
const API_BASE_URL = BACKEND_URL.endsWith("/api") ? BACKEND_URL : `${BACKEND_URL}/api`;

function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (normalizedPath === "/api") return API_BASE_URL;
  const withoutApiPrefix = normalizedPath.startsWith("/api/")
    ? normalizedPath.slice("/api".length)
    : normalizedPath;
  return `${API_BASE_URL}${withoutApiPrefix}`;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
}

interface JwtPayload {
  id: string;
  username: string;
  exp: number;
  iat: number;
}

export class AuthService {
  private static instance: AuthService;
  private user: User | null = null;

  private constructor() { }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await fetch(buildApiUrl("auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          try {
            const data = (await response.json()) as { error?: string; message?: string };
            const message = data?.error || data?.message;
            throw new Error(message || "Invalid credentials");
          } catch {
            throw new Error("Invalid credentials");
          }
        }

        const text = (await response.text()) || response.statusText;
        throw new Error(text || "Invalid credentials");
      }

      const data: { token: string } = await response.json();
      const { token } = data;

      localStorage.setItem("token", token);

      const decoded: JwtPayload = jwtDecode(token);

      this.user = {
        id: decoded.id,
        username: decoded.username,
      };

      localStorage.setItem("user", JSON.stringify(this.user));

      return this.user;

    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getCurrentUser(): User | null {
    if (this.user) {
      return this.user;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
        return this.user;
      } catch (e) {
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const decoded: { exp: number } = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}

export const authService = AuthService.getInstance();
