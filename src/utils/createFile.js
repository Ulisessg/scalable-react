const { writeFile } = require('fs');

function createFiles(path, template, name, extension) {
  if (!path || !template || !extension) {
    throw new Error('You need a path and a template');
  }

  writeFile(`${path}/${name}${extension}`, template, () => {
    console.log('Success');
  });
}

module.exports = createFiles;
