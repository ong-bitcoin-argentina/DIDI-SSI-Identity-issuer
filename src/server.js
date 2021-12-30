const express = require('express');

const app = express();

app.get('/identityId', (req, res) => {
  res.status(200).json({ id: '1234' });
});

module.exports = app;
