#!/usr/bin/env tsx
/**
 * Validation Script
 * Usage: npm run validate -- path/to/diagram.drawio
 */

import { quickValidate } from '../tools/src/index.js';
import { resolve } from 'path';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: npm run validate -- <file-path>');
  console.error('Example: npm run validate -- ./drawio/my-diagram.drawio');
  process.exit(1);
}

const absolutePath = resolve(filePath);
console.log(`Validating: ${absolutePath}\n`);

try {
  const result = await quickValidate(absolutePath);

  if (result.valid) {
    console.log('✓ Validation passed!');
    console.log('The diagram XML is well-formed and follows draw.io standards.');
    process.exit(0);
  } else {
    console.error('✗ Validation failed:\n');
    console.error(`  ${result.error}`);
    console.error('\nSuggestion: Run "npm run repair" to attempt automatic fixes.');
    process.exit(1);
  }
} catch (error) {
  console.error('✗ Error reading file:');
  console.error(`  ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
