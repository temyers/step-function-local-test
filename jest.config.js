const { defaults: tsjPreset } = require('ts-jest/presets');
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: [
    "/node_modules/(?!(serverless-offline)/)",
  ],
  transform: {
    ...tsjPreset.transform,
    "^.+\\.vm$": "jest-raw-loader"
  },
  
};