#!/usr/bin/env node
//@ts-check

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
      `${process.cwd()}/public/index.html`,
    );
  } catch (error) {
    throw error;
  }
})();
