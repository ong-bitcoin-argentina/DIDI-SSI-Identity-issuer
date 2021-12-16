const express = require('express');

const app = express();

app.get('/identity/:identityId', (req, res) => {
    res.json({
        id: req.params.identityId,
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));