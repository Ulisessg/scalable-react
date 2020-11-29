//@ts-check
const { join } = require('path');

const directories = [
  'assets/icons',
  'assets/images',
  'public',
  //react
  'src/react',
  'src/react/atoms',
  'src/react/molecules',
  'src/react/organisms',
  'src/react/templates',
  'src/react/pages',
  //Styles
  'src/styles',
  'src/styles/atoms',
  'src/styles/molecules',
  'src/styles/organisms',
  'src/styles/templates',
  'src/styles/pages',
];

const indexHtml = [
  join(process.cwd(), 'public'),
  `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scalable react app</title>
  </head>
  <body></body>
</html>
`,
];

module.exports = {
  directories,
  indexHtml,
};
