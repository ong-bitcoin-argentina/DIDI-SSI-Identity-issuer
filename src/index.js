require('./services/logger');
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

const { permanentJob } = require('./jobs/jobs');

const routes = require('./routes/index');
const serviceRoutes = require('./routes/serviceRoutes');

const { MONGO_URI } = require('./constants/Constants');
const Messages = require('./constants/Messages');
const Constants = require('./constants/Constants');
const { logCalls } = require('./middelwares/logCalls');

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// aumentar el tamaño de request permitido para poder recibir la imagen en base64
app.use(express.json({ limit: '10mb' }));

mongoose
  .connect(MONGO_URI)
  // eslint-disable-next-line no-console
  .then(() => console.log(Messages.INDEX.MSG.CONNECTED))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(Messages.INDEX.ERR.CONNECTION + err.message);
  });

// loggear llamadas
if (Constants.DEBUG) {
  app.use(logCalls);
}

app.use(serviceRoutes);
app.use(routes);
app.use('*', (req, res) =>
  res.status(404).json({
    status: 'error',
    errorCode: 'INVALID_ROUTE',
    message: 'La ruta no existe.',
  }),
);
permanentJob();

module.exports = app;
