import globals from "globals";
import { defineConfig } from "eslint/config";
import google from "eslint-config-google";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
    rules: {
      ...google.rules,
      "require-jsdoc": "off",
      "max-len": ["error", { code: 120 }],
    },
  },
]);
