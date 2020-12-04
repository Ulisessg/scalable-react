const { copyFile } = require('fs');
const { join } = require('path');

async function cf(nameOfOriginalFile, pathOfDesitiny) {
  const fullOriginalFilePath = join(
    __dirname,
    '..',
    'templates',
    nameOfOriginalFile,
  );
  const fullDestinyPath = join(process.cwd(), pathOfDesitiny);

  copyFile(fullOriginalFilePath, fullDestinyPath, () => {
    console.log(`${nameOfOriginalFile} copied`);
  });
}

module.exports = cf;
