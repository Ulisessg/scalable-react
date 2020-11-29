const { join } = require('path');

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

module.exports = indexHtml;
