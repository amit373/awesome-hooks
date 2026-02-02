module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: [
    '**/tests/**/*.test.(ts|tsx|js|jsx)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          allowJs: true,
          esModuleInterop: true,
          module: 'commonjs',
          target: 'es2020',
          isolatedModules: true,
          resolveJsonModule: true,
        },
      },
    ],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@angular|@angular.*|rxjs|@angular-devkit|zone.js))'
  ],
  moduleNameMapper: {
    '^@angular/common$': '<rootDir>/node_modules/@angular/common/fesm2022/common.mjs',
    '^@angular/core$': '<rootDir>/node_modules/@angular/core/fesm2022/core.mjs',
    '^@angular/core/testing$': '<rootDir>/node_modules/@angular/core/fesm2022/testing.mjs',
    '^@angular/platform-browser$': '<rootDir>/node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs',
    '^@angular/platform-browser-dynamic$': '<rootDir>/node_modules/@angular/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs',
    '^@angular/cdk$': '<rootDir>/node_modules/@angular/cdk/fesm2022/cdk.mjs',
    '^@angular/animations$': '<rootDir>/node_modules/@angular/animations/fesm2022/animations.mjs',
    '^@angular/forms$': '<rootDir>/node_modules/@angular/forms/fesm2022/forms.mjs',
    '^@angular/compiler$': '<rootDir>/node_modules/@angular/compiler/fesm2022/compiler.mjs',
    '^@angular/router$': '<rootDir>/node_modules/@angular/router/fesm2022/router.mjs',
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.common.js',
    '^@vue/test-utils$': '<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  extensionsToTreatAsEsm: ['.ts'],
  collectCoverageFrom: [
    'hooks/**/*.{ts,tsx}',
    '!hooks/**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
};