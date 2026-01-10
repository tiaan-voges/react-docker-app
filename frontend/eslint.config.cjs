const js = require("@eslint/js");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const importPlugin = require("eslint-plugin-import");
const globals = require("globals");
const prettier = require("eslint-config-prettier");

module.exports = [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
  ecmaVersion: "latest",
  sourceType: "module",

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  globals: {
    ...globals.browser,
    ...globals.node,
  },
},



    settings: {
      react: {
        version: "detect",
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },

    rules: {
      /* Ensure JSX usage is recognized so imports used in JSX aren't flagged as unused */
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      /* React */
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-key": "error",

      /* Hooks */
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      /* Imports */
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],

      /* Clean code */
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "warn",
    },
  },
  prettier,
];
