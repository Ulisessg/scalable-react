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

    //.gitignore
    await copyFile(
      '../src/templates/.gitignore',
      join(process.cwd(), '.gitignore'),
    );
    //.babelrc
    await copyFile(
      '../src/templates/.babelrc',
      join(process.cwd(), '.babelrc'),
    );

    //.eslintrc
    await copyFile(
      '../src/templates/.eslintrc',
      join(process.cwd(), '.eslintrc'),
    );
  } catch (error) {
    throw error;
  }
})();
