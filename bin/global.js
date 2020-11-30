#!/usr/bin/env node
//@ts-check

const { join } = require('path');

//Data
const { directories } = require('../src/data/index');

//Utils
const { mkdirs, copyFile } = require('../src/index');

(async function main() {
  try {
    //Make directiores
    await mkdirs(directories);

    //Create index.html
    await copyFile(
      '../src/templates/index.html',
      join(process.cwd(), 'public', 'index.html'),
    );

    //Create index.js
    await copyFile(
      '../src/templates/index.js',
      join(process.cwd(), 'src', 'react', 'pages', 'index.js'),
    );
  } catch (error) {
    throw error;
  }
})();
