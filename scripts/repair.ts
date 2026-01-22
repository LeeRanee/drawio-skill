#!/usr/bin/env tsx
/**
 * Repair Script
 * Usage: npm run repair -- path/to/diagram.drawio
 */

import { quickRepair, validateDrawioXML } from '../tools/src/index.js';
import { resolve } from 'path';
import { copyFile, readFile } from 'fs/promises';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: npm run repair -- <file-path>');
  console.error('Example: npm run repair -- ./drawio/my-diagram.drawio');
  process.exit(1);
}

const absolutePath = resolve(filePath);
const backupPath = `${absolutePath}.backup`;

console.log(`Repairing: ${absolutePath}\n`);

try {
  // Create backup
  await copyFile(absolutePath, backupPath);
  console.log(`✓ Backup created: ${backupPath}`);

  // Attempt repair
  const result = await quickRepair(absolutePath);

  if (result.repaired && result.fixedIssues) {
    console.log(`\n✓ Repaired ${result.fixedIssues.length} issue(s):`);
    result.fixedIssues.forEach((issue, i) => {
      console.log(`  ${i + 1}. ${issue}`);
    });

    // Validate the repaired file
    const xml = await readFile(absolutePath, 'utf-8');
    const validation = validateDrawioXML(xml);

    if (validation.valid) {
      console.log('\n✓ Validation passed after repair!');
      console.log('The diagram is now well-formed.');
    } else {
      console.log('\n⚠ Warning: Some issues remain after repair:');
      console.log(`  ${validation.error}`);
      console.log('\nYou may need to manually fix these issues.');
    }
  } else {
    console.log('✓ No repairs needed - file is already valid.');
  }

  process.exit(0);
} catch (error) {
  console.error('\n✗ Error during repair:');
  console.error(`  ${error instanceof Error ? error.message : String(error)}`);
  console.error(`\nBackup preserved at: ${backupPath}`);
  process.exit(1);
}
