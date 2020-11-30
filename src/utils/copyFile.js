const { copyFile } = require('fs');
const { join } = require('path');

function cf(file, path) {
  return new Promise((resolve, reject) => {
    copyFile(file, path, () => {
      resolve('File copied');
    });
  });
}

module.exports = cf;
