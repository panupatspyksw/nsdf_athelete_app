module.exports = {
  root: true,
  extends: ["@react-native-community", "prettier"],
  plugins: ["react", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ],
    "react-native/no-inline-styles": 0,
    "no-console": "warn",
    semi: "off",
    "import/extensions": "off",
    "react/no-unused-state": "error",
    "no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ]
  }
}
