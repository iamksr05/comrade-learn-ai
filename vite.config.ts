import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Allow requests from Replit domain
    allowedHosts: [
      "c7a3b5ad-361c-4bad-997a-6edcfa272c1c-00-3onrsxrjqdrjv.worf.replit.dev",
      ".replit.dev", // Allow all Replit subdomains
      ".worf.replit.dev", // Allow all worf.replit.dev subdomains
    ],
    strictPort: false,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
