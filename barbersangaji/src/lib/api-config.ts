// API Configuration for Barbersangaji Website
// This allows the website to fetch content from the admin backend

// Default to local development, can be overridden with VITE_API_URL environment variable
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// API Endpoints
export const API_ENDPOINTS = {
    content: `${API_BASE_URL}/api/content`,
    testimonials: `${API_BASE_URL}/api/testimonials`,
    health: `${API_BASE_URL}/api/health`,
};

// Fetch helper with error handling
export async function fetchFromAPI<T>(endpoint: string): Promise<T | null> {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            console.error(`API Error: ${response.status} ${response.statusText}`);
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch from API:', error);
        return null;
    }
}
