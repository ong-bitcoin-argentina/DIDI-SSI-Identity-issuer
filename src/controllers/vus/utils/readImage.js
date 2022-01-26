const fs = require('fs');

module.exports.readImage = function readImage(file) {
  // convierto imagen a base64
  const contents = fs.readFileSync(file.path, {
    encoding: 'base64',
  });

  fs.unlinkSync(file.path);

  return contents;
};
