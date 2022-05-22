const fs = require('fs/promises');
const path = require('path');

async function mergeStyles(sourcePath, destination) {
  const dirents = await fs.readdir(sourcePath, {
    withFileTypes: true
  });
  let styles = '';
  for (const dirent of dirents) {
    if (dirent.isFile() && path.parse(dirent.name).ext === '.css') {
      const file = await fs.readFile(path.join(__dirname, 'styles', dirent.name));
      styles += file;
    }
  }
  fs.writeFile(destination, styles);
}

mergeStyles(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'bundle.css'));