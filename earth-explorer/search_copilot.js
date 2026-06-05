import fs from 'fs';
import path from 'path';

const dir = 'c:/Users/aishw/OneDrive/Documents/Coding/AI-Agent/earth-explorer/node_modules/@copilotkit/react-core/dist';

function searchFile(filePath) {
  if (filePath.endsWith('.d.ts') || filePath.endsWith('.d.cts') || filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('useCopilotChatHeadless_c')) {
      console.log(`Found in: ${filePath}`);
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
