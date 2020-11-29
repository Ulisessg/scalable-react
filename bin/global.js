#!/usr/bin/env node
//@ts-check

//Data
const { directories } = require('../src/data/index');

//Utils
const { mkdirs } = require('../src/index');

mkdirs(directories);
