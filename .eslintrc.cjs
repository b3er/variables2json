module.exports = {
  env: {
    node: true
  },
  globals: {
    figma: "readonly",
    __html__: "readonly"
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "vue/multi-word-component-names": "off",
    "no-unused-vars": "off"
  }
};
