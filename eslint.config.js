/**
 * ESLint configuration for the project
 * Uses the flat config format (ESLint 9+)
 * 
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  // Global ignores
  {
    ignores: ["dist", "node_modules", "build", ".next"],
  },
  
  // Main configuration for TypeScript and React files
  {
    // Base configurations
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    
    // Files to lint
    files: ["**/*.{ts,tsx}"],
    
    // Language options
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    
    // Plugins
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    
    // Rules
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // React Refresh - warn about components that should be exported
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      
      // TypeScript - disable unused vars to align with tsconfig settings
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
);
