const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true});
  const files = await fs.readdir(path.join(__dirname, 'files'));
  files.forEach(async file => {
    await fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
  });
}
copyDir();
