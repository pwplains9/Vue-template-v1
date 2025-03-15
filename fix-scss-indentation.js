/**
 * Script to fix SCSS indentation issues
 * Run with: node fix-scss-indentation.js
 */
import fs from 'fs';
import path from 'path';
import glob from 'glob';

// Configuration
const srcDir = 'src';
const filePattern = 'styles/**/*.scss';
const indentSize = 2;

// Find all SCSS files
const scssFiles = glob.sync(path.join(srcDir, filePattern));

console.log(`Found ${scssFiles.length} SCSS files to process`);

let fixedFiles = 0;

// Process each file
scssFiles.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let indentLevel = 0;
    let modified = false;

    // Process each line
    const processedLines = lines.map(line => {
      // Skip empty lines and comments
      if (line.trim() === '' || line.trim().startsWith('//')) {
        return line;
      }

      // Decrease indent level for closing braces
      if (line.trim().startsWith('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Calculate proper indentation
      const properIndent = ' '.repeat(indentLevel * indentSize);
      
      // Trim the line and add proper indentation
      const trimmedLine = line.trim();
      const indentedLine = properIndent + trimmedLine;
      
      // Increase indent level for opening braces
      if (trimmedLine.endsWith('{')) {
        indentLevel++;
      }

      // Check if the line was modified
      if (indentedLine !== line) {
        modified = true;
      }

      return indentedLine;
    });

    // Only write back if changes were made
    if (modified) {
      fs.writeFileSync(filePath, processedLines.join('\n'), 'utf8');
      fixedFiles++;
      console.log(`Fixed indentation in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log(`Completed! Fixed indentation in ${fixedFiles} files.`);
