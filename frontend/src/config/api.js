// One place that knows where the backend lives.
// In development this is "/api" and Vite forwards it to localhost:8000.
// In production it is set by .env.production
export const API_URL = import.meta.env.VITE_API_URL;
