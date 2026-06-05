import fs from 'fs';
import path from 'path';

const dir = 'c:/Users/aishw/OneDrive/Documents/Coding/AI-Agent/earth-explorer/node_modules/@copilotkit/react-core/dist';

function searchFile(filePath) {
  if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('not found after runtime sync')) {
      console.log(`Found in: ${filePath}`);
      // Print the surrounding lines
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('not found after runtime sync')) {
          console.log(`Line ${index + 1}: ${line.trim()}`);
          // Print 10 lines before and after
          for (let i = Math.max(0, index - 15); i < Math.min(lines.length, index + 15); i++) {
            console.log(`  ${i + 1}: ${lines[i]}`);
          }
        }
      });
    }
  }
}

function traverse(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else {
      searchFile(fullPath);
    }
  }
}

traverse(dir);
