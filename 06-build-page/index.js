const fs = require('fs/promises');
const path = require('path');

async function replaceTemplates(
  componentsPath = path.join(__dirname, 'components'),
  templatePath = path.join(__dirname, 'template.html'),
  destination = path.join(__dirname, 'project-dist', 'index.html')
) {
  fs.mkdir(path.join(__dirname, 'project-dist'), {
    recursive: true
  });

  const componentsNames = await fs.readdir(componentsPath);
  componentsNames.forEach((componentName, index) => {
    componentsNames[index] = path.parse(componentName).name;
  });
  let template = await fs.readFile(templatePath);
  template = template.toString().split('\r\n');
  const finishedTemplate = [];
  for (const line of template) {
    const name = line.trim().slice(2, line.trim().length - 2);
    if (componentsNames.includes(name)) {
      const component = await fs.readFile(path.join(componentsPath, name + '.html'));
      finishedTemplate.push(component.toString() + '\r\n');
    } else {
      finishedTemplate.push(line + '\r\n');
    }
  }
  fs.writeFile(destination, finishedTemplate);
}

async function mergeStyles(
  sourcePath = path.join(__dirname, 'styles'),
  destination = path.join(__dirname, 'project-dist', 'bundle.css')
) {
  const dirents = await fs.readdir(sourcePath, {withFileTypes: true});
  dirents.forEach(async dirent => {
    if (dirent.isFile() && path.parse(dirent.name).ext === '.css') {
      const file = await fs.readFile(path.join(sourcePath, dirent.name));
      fs.appendFile(destination, file.toString());
    }
  });
}

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

(async () => {
  replaceTemplates();
  mergeStyles(path.join(__dirname, 'styles'), path.join(__dirname, 'project-dist', 'style.css'));
  copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
})();