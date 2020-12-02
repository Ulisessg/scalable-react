#!/usr/bin/env node
//@ts-check

//Modules
const { join } = require('path');
const { exec } = require('child_process');

const action = process.argv[2];

//Data
const { directories } = require('../src/data/index');

//Utils
const { mkdirs, copyFile, build } = require('../src/index');

async function init() {
  try {
    //Make directiores
    await mkdirs(directories);

    //Create index.html
    await copyFile(
      join(__dirname, '..', 'src', 'templates', 'index.html'),
      join(process.cwd(), 'public', 'index.html'),
    );

    //Create index.js
    await copyFile(
      join(__dirname, '..', 'src', 'templates', 'index.js'),
      join(process.cwd(), 'src', 'react', 'pages', 'index.js'),
    );

    //.gitignore
    await copyFile(
      join(__dirname, '..', 'src', 'templates', '.gitignore'),
      join(process.cwd(), '.gitignore'),
    );
    //.babelrc
    await copyFile(
      join(__dirname, '..', 'src', 'templates', '.babelrc'),
      join(process.cwd(), '.babelrc'),
    );

    //.eslintrc
    await copyFile(
      join(__dirname, '..', 'src', 'templates', '.eslintrc'),
      join(process.cwd(), '.eslintrc'),
    );

    //package.json
    await copyFile(
      join(__dirname, '..', 'src', 'templates', 'package.json'),
      join(process.cwd(), 'package.json'),
    );

    //webpack.production.js
    await copyFile(
      join(__dirname, '..', 'src', 'templates', 'webpack.production.js'),
      join(process.cwd(), 'webpack.production.js'),
    );

    //webpack.dev.js
    await copyFile(
      join(__dirname, '..', 'src', 'templates', 'webpack.dev.js'),
      join(process.cwd(), 'webpack.dev.js'),
    ).then(() => {
      exec(`cd ${process.cwd()}; npm install --force`);
    });
  } catch (error) {
    throw error;
  }
}

function develop(file) {
  const devExec = exec(
    `FILE=${file} webpack serve --progress --color --config ./webpack.dev.js`,
  );
  devExec.stdout.on('data', (data) => {
    console.log(data);
  });
}

switch (action) {
  case 'init':
    init();
    break;
  case 'dev':
    develop(process.argv[3]);
    break;
  case 'build':
    build();
    break;
  default:
    throw new Error(`This command doesn't exist`);
}
