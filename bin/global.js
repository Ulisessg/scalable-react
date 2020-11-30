#!/usr/bin/env node
//@ts-check

//Modules
const { join } = require('path');

const action = process.argv[2];

//Data
const { directories } = require('../src/data/index');

//Utils
const { mkdirs, copyFile } = require('../src/index');

async function init() {
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

    //package.json
    await copyFile(
      '../src/templates/package.json',
      join(process.cwd(), 'package.json'),
    );
    await copyFile(
      '../src/templates/webpack.dev.js',
      join(process.cwd(), 'webpack.dev.js'),
    );
  } catch (error) {
    throw error;
  }
}

function develop() {
  //
}

switch (action) {
  case 'init':
    init();
    break;
  case 'develop':
    develop();
    break;
  default:
    throw new Error(`This command doesn't exist`);
}
