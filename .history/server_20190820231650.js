const express = require('express');
const app = express();
const db = require('./database.js');

const http_port = 3000;

app.listen(http_port, () => {
    console.log(`Server running on port ${http_port}`);
});

app.get('/', (req, res) => res.json({"message":"Ok"}));

app.get('/api/users', (re));

app.use((req, res) => {
    res.status(404);
});