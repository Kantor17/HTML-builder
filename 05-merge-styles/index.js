const fs = require('fs/promises');
const path = require('path');

(async () => {
  const dirents = await fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
  dirents.forEach(async dirent => {
    if(dirent.isFile() && path.parse(dirent.name).ext === '.css') {
      const file = await fs.readFile(path.join(__dirname, 'styles', dirent.name));
      fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), file.toString());
    }
  });
})();