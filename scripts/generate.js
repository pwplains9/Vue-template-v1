#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const [, , type, name] = process.argv;

if (!type || !name) {
  console.error('Usage: npm run generate <component|page> <name>');
  process.exit(1);
}

const baseDir = 'src';
let targetDir = '';
let componentName = '';

if (type === 'component') {
  targetDir = path.join(baseDir, 'components', name);
  componentName = name;
} else if (type === 'page') {
  targetDir = path.join(baseDir, 'pages', name);
  componentName = name;
} else {
  console.error('Invalid type. Use "component" or "page".');
  process.exit(1);
}

// Create directory
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
} else {
  console.log(`Directory already exists: ${targetDir}`);
}

// Create .vue file
const componentContent = `<template>
  <div class="${name.toLowerCase()}">
    ${name} Component
  </div>
</template>

<script>
export default {
  name: '${componentName}'
}
</script>

<style lang="scss">
@import "./index.scss";
</style>
`;

const componentFilePath = path.join(targetDir, `${componentName}.vue`);
fs.writeFileSync(componentFilePath, componentContent);
console.log(`Created component file: ${componentFilePath}`);

// Create index.scss file
const scssContent = `.${name.toLowerCase()} {
  // Your styles here
}
`;

const scssFilePath = path.join(targetDir, 'index.scss');
fs.writeFileSync(scssFilePath, scssContent);
console.log(`Created SCSS file: ${scssFilePath}`);

console.log(`✅ ${type} "${name}" created successfully!`);
