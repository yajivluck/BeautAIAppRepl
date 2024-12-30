import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['.'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/console', 'src/migration'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  maxWorkers: 1, // Run tests serially

};

export default config;
