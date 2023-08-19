module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  overrides: [
    {
      files: ['*.js', '*.mjs', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/ban-ts-comment': [
          'error',
          { 'ts-ignore': 'allow-with-description' },
        ],
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/semi': 'off',
        'import/order': [
          'error',
          {
            alphabetize: {
              order: 'asc',
            },
            groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
            'newlines-between': 'always',
            pathGroups: [
              {
                group: 'external',
                pattern: 'src/**',
                position: 'after',
              },
              {
                group: 'external',
                pattern: 'contracts/**',
                position: 'after',
              },
              {
                group: 'external',
                pattern: 'front/**',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: ['builtin'],
          },
        ],
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'react/react-in-jsx-scope': 'off', // react 18
        semi: ['error', 'never'],
        'sort-class-members/sort-class-members': [
          2,
          {
            accessorPairPositioning: 'getThenSet',
            order: [
              '[static-properties]',
              '[static-methods]',
              '[properties]',
              '[conventional-private-properties]',
              'constructor',
              '[methods]',
              '[conventional-private-methods]',
            ],
          },
        ],
        'sort-destructure-keys/sort-destructure-keys': [2, { caseSensitive: true }],
        'sort-imports': [
          'error',
          {
            allowSeparatedGroups: true,
            ignoreDeclarationSort: true,
          },
        ],
        'sort-keys-fix/sort-keys-fix': 'warn',
        'typescript-sort-keys/interface': 'error',
        'typescript-sort-keys/string-enum': 'error',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'sort-destructure-keys',
    'sort-keys-fix',
    'typescript-sort-keys',
    'sort-class-members',
  ],
  root: true,
}
