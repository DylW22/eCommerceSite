import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },

  {
    languageOptions: { globals: globals.browser },
  },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  {
    ignores: [
      "node_modules/",
      ".git/",
      "tests/",
      "src/pages/tests/",
      "dist/",
      "__mocks__/",
      "svgTransform.cjs",
      "run-component-test.js",
      "babel.config.cjs",
      ".eslintrc.cjs",
      "coverage/",
    ],
  },
  {
    rules: {
      "require-await": "error",
      "react/react-in-jsx-scope": 0,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_" },
      ],
    },
  },
];
