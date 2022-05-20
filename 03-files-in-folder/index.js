const fs = require('fs/promises');
const path = require('path');
async function readFiles(dirPath) {
  const files = await fs.readdir(dirPath, {withFileTypes: true});
  files.forEach(async dirent => {
    if(dirent.isFile()) {
      const stat = await fs.stat(path.join(dirPath, dirent.name));
      console.log(`${path.parse(dirent.name).name} - ${path.parse(dirent.name).ext} - ${stat.size}`);
    }
  });
}

readFiles(path.join(__dirname, 'secret-folder'));
