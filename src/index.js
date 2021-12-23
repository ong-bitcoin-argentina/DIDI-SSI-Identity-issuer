const apicache = require('apicache');
const redis = require('redis');
const express = require('express');

const Constants = require('../constants/Constants');
const Messages = require('../constants/Messages');

const app = express();

app.use(
  apicache
    .options({
      redisClient: redis.createClient(),
      debug: false,
      trackPerformance: true,
      respectCacheControl: false,
    })
    .middleware(),
);

app.get('/cache', (_, res) => {
  try {
    res.json({
      performance: apicache.getPerformance(),
      index: apicache.getIndex(),
    });
  } catch (e) {
    res.status(500);
  }
});

app.get('/:identityId', (req, res) => {
  res.json({
    id: req.params.identityId,
  });
});

app.listen(Constants.PORT, () =>
  console.log(Messages.INDEX.MSG.RUNNING_ON + Constants.PORT),
);

module.exports = {
  app,
};
