//@ts-check
const { mkdir } = require('fs');

function mkdirs(dirs = []) {
  if (dirs.length === 0) {
    throw new Error('No directories, tell me, which directories do you want');
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < dirs.length; i++) {
      if (i < dirs.length) {
        resolve();
      }
      const paths = `${process.cwd()}/${dirs[i]}`;

      mkdir(paths, { recursive: true }, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  });
}

module.exports = mkdirs;
