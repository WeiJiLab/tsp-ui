import type { Config } from 'jest'
import { defaults } from 'jest-config'

const config: Config = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx', 'js', 'json', 'mts'],

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  // coverageThreshold: {
  //     global: {
  //         branches: 80,
  //         functions: 80,
  //         lines: 80,
  //         statements: 80,
  //     },
  // },
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
}

export default config
