//@ts-check
const { mkdir } = require('fs');

async function mkdirs(dir) {
  if (dir.length === 0) {
    throw new Error('No directories, tell me, which directories do you want');
  }

  mkdir(dir, { recursive: true }, (err, path) => {
    if (err) throw err;
    console.log(`${dir} created`);
  });
}

module.exports = mkdirs;
