module.exports = {
  extends: [
    // "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-console": 1,
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  plugins: ["react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
