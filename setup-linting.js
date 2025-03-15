/**
 * Script to set up linting for the project
 * Run with: node setup-linting.js
 */
import { execSync } from 'child_process';
import fs from 'fs';

console.log('Setting up linting for the project...');

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install --save-dev stylelint-config-standard-scss@^10.0.0 eslint@^8.56.0 eslint-plugin-vue@^9.21.1 eslint-config-prettier@^9.1.0 eslint-plugin-prettier@^5.1.3', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error);
  process.exit(1);
}

// Verify configuration files
const configFiles = [
  '.stylelintrc',
  '.eslintrc.cjs',
  '.vscode/settings.json',
  'fix-scss-indentation.js'
];

console.log('Verifying configuration files...');
let allFilesExist = true;
for (const file of configFiles) {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} exists`);
  } else {
    console.error(`❌ ${file} does not exist`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.error('Some configuration files are missing. Please check the setup.');
  process.exit(1);
}

// Test linting commands
console.log('Testing linting commands...');
try {
  console.log('Running StyleLint...');
  execSync('npm run lint:styles', { stdio: 'inherit' });
  
  console.log('Running ESLint...');
  execSync('npm run lint:js', { stdio: 'inherit' });
  
  console.log('Running Prettier...');
  execSync('npm run lint:prettier', { stdio: 'inherit' });
  
  console.log('✅ Linting commands tested successfully');
} catch (error) {
  console.error('❌ Failed to test linting commands:', error);
  process.exit(1);
}

console.log('\n✅ Linting setup completed successfully!');
console.log('\nYou can now use the following commands:');
console.log('- npm run lint:js     - Fix ESLint issues');
console.log('- npm run lint:styles - Fix StyleLint issues');
console.log('- npm run lint:prettier - Format with Prettier');
console.log('- npm run lint        - Run all linters with autofix');
console.log('- node fix-scss-indentation.js - Fix SCSS indentation issues'); 