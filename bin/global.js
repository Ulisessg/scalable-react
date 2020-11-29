#!/usr/bin/env node
//@ts-check

//Data
const { directories, indexHtml } = require('../src/data/index');

//Utils
const { mkdirs, createFile } = require('../src/index');

//Make directiores
mkdirs(directories);

//Create index.html
createFile(indexHtml[0], indexHtml[1], 'index', '.html');
