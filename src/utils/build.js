const { join } = require('path');
const { readdir } = require('fs');
const { exec } = require('child_process');
function build() {
  readdir(
    join(process.cwd(), 'src', 'react', 'pages'),
    { encoding: 'utf-8' },
    (error, files) => {
      if (error) throw error;
      for (let i = 0; i < files.length; i++) {
        const executeFile = exec(
          `FILE=${files[i]} webpack --config ./webpack.production.js`,
        );
        executeFile.stdout.on('data', (data) => {
          console.log(data);
        });
      }
    },
  );
}

module.exports = build;
