import js from '@eslint/js';
import react from 'eslint-plugin-react';
export default [js.configs.recommended, { files: ['src/**/*.{js,jsx}'], plugins: { react }, languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: { window: 'readonly', document: 'readonly', localStorage: 'readonly', Razorpay: 'readonly' }, parserOptions: { ecmaFeatures: { jsx: true } } }, settings: { react: { version: 'detect' } }, rules: { 'react/react-in-jsx-scope': 'off', 'react/prop-types': 'off' } }];
