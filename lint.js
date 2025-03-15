/**
 * Simple script to run linting commands
 */
import { execSync } from 'child_process';

console.log('Running linting commands...');

try {
  // Run StyleLint
  console.log('\nRunning StyleLint...');
  execSync('npx stylelint "src/**/*.(css|scss)" --fix', { stdio: 'inherit' });
  
  // Run Prettier
  console.log('\nRunning Prettier...');
  execSync('npx prettier --write src/**/*.{js,scss,vue}', { stdio: 'inherit' });
  
  // Run ESLint
  console.log('\nRunning ESLint...');
  execSync('npx eslint "src/**/*.{js,vue}" --fix', { stdio: 'inherit' });
  
  console.log('\n✅ All linting commands completed successfully!');
} catch (error) {
  console.error('\n❌ Error running linting commands:', error.message);
  process.exit(1);
} 