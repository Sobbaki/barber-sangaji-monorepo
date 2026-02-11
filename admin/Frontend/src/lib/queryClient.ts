import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { authService } from "./auth";

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

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    if (res.status === 401) {
      authService.logout();
    }
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: any
): Promise<Response> {
  const token = authService.getToken();
  let body = data;
  const headers: HeadersInit = data ? { "Content-Type": "application/json" } : {};

  if (data instanceof FormData) {
        delete headers['Content-Type']; 
    } else if (data) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
    }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(buildApiUrl(url), {
    method,
    headers,
    body: body,
  });

  if (res.status === 401) {
    authService.logout();
  }

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
    async ({ queryKey }) => {
      const token = authService.getToken();
      const headers: HeadersInit = {};

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const path = queryKey.join("/");

      const res = await fetch(buildApiUrl(path), {
        headers,
      });

      if (res.status === 401) {
        authService.logout();
        if (unauthorizedBehavior === "returnNull") {
          return null;
        }
      }

      await throwIfResNotOk(res);
      return await res.json();
    };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
