/** @type {import("prettier").Config} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '',
    '^react$',
    '^next(/.*)?$',
    '',
    '^payload(/.*)?$',
    '^@payloadcms(/.*)?$',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[.]',
    '',
    '<TYPES>',
  ],
  importOrderTypeScriptVersion: '5.0.0',
};

export default config;
