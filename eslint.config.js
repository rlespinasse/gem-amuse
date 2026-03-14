export default [
  {
    files: ["site/**/*.js"],
    rules: {
      "no-unused-vars": ["warn", { "varsIgnorePattern": "^(openModal|closeModal)$" }],
      "no-undef": "off"
    }
  }
];
