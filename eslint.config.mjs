import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default await tseslint.config({
  extends: [js.configs.recommended],
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    'prettier/prettier': 'error',
  },
});
