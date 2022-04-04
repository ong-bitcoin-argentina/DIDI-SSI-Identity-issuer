/* eslint-disable no-console */
// loggear llamadas
const logCalls = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  process.stdout.write('body: ');
  console.log(req.body);
  process.stdout.write('Headers: ');
  console.log(req.headers);
  next();
};

module.exports = { logCalls };
