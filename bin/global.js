#!/usr/bin/env node
//@ts-check

//Modules
const { join, resolve } = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const action = process.argv[2];

//Utils
const { mkdirs, copyFile, build } = require('../src/index');

const cwd = process.cwd();
async function init() {
  //Assets
  mkdirs(join(cwd, 'assets', 'icons'));
  mkdirs(join(cwd, 'assets', 'images'));

  //Create index.html
  mkdirs(join(cwd, 'public')).finally(() => {
    fs.copyFile(
      join(__dirname, '..', 'src', 'templates', 'index.html'),
      join(cwd, 'public', 'index.html'),
      (err) => {
        if (err) throw err;
        console.log('index.html copied');
      },
    );
  });

  //React
  mkdirs(join(cwd, 'src', 'react'));
  mkdirs(join(cwd, 'src', 'react', 'pages'));
  mkdirs(join(cwd, 'src', 'react', 'atoms'));
  mkdirs(join(cwd, 'src', 'react', 'molecules'));
  mkdirs(join(cwd, 'src', 'react', 'organisms'));
  mkdirs(join(cwd, 'src', 'react', 'templates'));

  //Styles
  mkdirs(join(cwd, 'src', 'styles', 'atoms'));
  mkdirs(join(cwd, 'src', 'styles', 'molecules'));
  mkdirs(join(cwd, 'src', 'styles', 'organisms'));
  mkdirs(join(cwd, 'src', 'styles', 'templates'));
  mkdirs(join(cwd, 'src', 'styles', 'pages'));

  //.gitignore
  copyFile('.gitignore', '.gitignore');
  //.babelrc
  copyFile('.babelrc', '.babelrc');

  //.eslintrc
  copyFile('.eslintrc', '.eslintrc');

  //package.json
  copyFile('package.json', 'package.json');

  //webpack.production.js
  copyFile('webpack.production.js', 'webpack.production.js');

  //webpack.dll.js
  copyFile('webpack.dll.js', 'webpack.dll.js');

  //webpack.dev.js
  copyFile('webpack.dev.js', 'webpack.dev.js');
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
    init().finally(() => {
      //.index.js
      fs.writeFile(
        join(cwd, 'src', 'react', 'pages', 'index.js'),
        `import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render(
  <h1>
    Now you can build the future&nbsp;
    <span aria-label='emoji de sonrisa' role='img'>
      😄
    </span>
  </h1>,
  document.getElementById('root'),
);`,
        () => {
          console.log('Index file created');
        },
      );

      console.log('Installing dependencies');
      const install = exec(`cd ${cwd}; npm install --force`);

      install.on('message', (message) => {
        console.log(message);
      });

      install.on('error', (err) => {
        throw err;
      });
    });

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
