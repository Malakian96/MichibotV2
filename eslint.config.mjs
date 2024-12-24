/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  {
    // Add ignore patterns
    ignores: ["node_modules/", "dist/", "*.config.js"],
    // Add custom rules
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ], // Ignore unused vars starting with "_"
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": "error",
    },
    plugins: {
      prettier: prettierPlugin,
      jest: jest,
    },
  },
);
