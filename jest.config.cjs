/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.spec\\.ts$',
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/test/'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'CommonJS',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
    '^.+\\.js$': [
      'babel-jest',
      {
        presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
        plugins: ['./test/babel-plugin-transform-import-meta.cjs'],
      },
    ],
  },
  transformIgnorePatterns: ['node_modules[\\\\/](?!@nestjs[\\\\/])'],
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
};
