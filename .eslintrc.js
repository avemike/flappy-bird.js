module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "prettier/react",
  ],
  plugins: ["react", "react-hooks", "prettier"],
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [".eslintrc.js", "dist"],
  rules: {
    "no-console": 1,
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandLast: true,
        noSortAlphabetically: true,
        reservedFirst: ["key"],
      },
    ],
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        caughtErrors: "none",
        vars: "all",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: ["return", "function", "if", "switch"],
      },
      {
        blankLine: "always",
        prev: ["if"],
        next: "*",
      },
      {
        blankLine: "always",
        prev: ["const"],
        next: ["block-like", "function", "type", "interface", "expression"],
      },
      {
        blankLine: "always",
        prev: ["import"],
        next: ["block-like", "function", "const", "type", "interface"],
      },
    ],
  },
};
