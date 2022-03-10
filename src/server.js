const Constants = require('./constants/Constants');
const Messages = require('./constants/Messages');

const app = require('./index');

const server = app.listen(Constants.PORT, () =>
  // eslint-disable-next-line no-console
  console.log(Messages.INDEX.MSG.RUNNING_ON + Constants.PORT),
);

module.exports = { app, server };
