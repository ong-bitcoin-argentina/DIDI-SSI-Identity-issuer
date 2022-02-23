const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

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

const { MONGO_URI } = require('./constants/Constants');
const Messages = require('./constants/Messages');
const routes = require('./routes/index');
const serviceRoutes = require('./routes/serviceRoutes');

mongoose
  .connect(MONGO_URI)
  // eslint-disable-next-line no-console
  .then(() => console.log(Messages.INDEX.MSG.CONNECTED))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log(Messages.INDEX.ERR.CONNECTION + err.message);
  });

app.use(serviceRoutes);
app.use('/api', routes);
app.use('*', (req, res) =>
  res.status(404).json({
    status: 'error',
    errorCode: 'INVALID_ROUTE',
    message: 'La ruta no existe.',
  }),
);

module.exports = app;
