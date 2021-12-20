const express = require('express');

const app = express();
const Constants = require('../constants/Constants');
const Messages = require('../constants/Messages');

app.get('/identity/:identityId', (req, res) => {
  res.json({
    id: req.params.identityId,
  });
});

app.listen(Constants.PORT, () =>
  console.log(Messages.INDEX.MSG.RUNNING_ON + Constants.PORT),
);
