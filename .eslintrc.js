module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    commonjs: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
  globals: {
    TWO: true,
    TWO_STRING: true,
    api: true,
  },
};
