const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      'no-undef': 'error', // Disable the rule globally
    },
  },
];

export default eslintConfig;