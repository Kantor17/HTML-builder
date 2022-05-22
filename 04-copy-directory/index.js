const fs = require('fs/promises');
const path = require('path');

async function copyDir(sourcePath, destination) {
  fs.mkdir(destination, {
    recursive: true
  });
  const dirents = await fs.readdir(sourcePath, {
    withFileTypes: true
  });
  dirents.forEach(async dirent => {
    if (dirent.isFile()) {
      await fs.copyFile(path.join(sourcePath, dirent.name), path.join(destination, dirent.name));
    } else {
      copyDir(path.join(sourcePath, dirent.name), path.join(destination, dirent.name));
    }
  });
}

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));