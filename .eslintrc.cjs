module.exports = {
    env: {
        node: true,
    },
    
    
    extends: [
        "eslint:recommended", 
        "plugin:vue/vue3-recommended", 
        "prettier"
    ],
    parser: "vue-eslint-parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: "@typescript-eslint/parser",
    },
    rules: {
        "vue/multi-word-component-names": "off",
    },
};
