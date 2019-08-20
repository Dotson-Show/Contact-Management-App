const express = require('express');
const app = express();
const db = require('./database.js');

const http_port = 3000;

app.listen(http_port, () => {
    console.log(`Server running on port ${http_port}`);
});

app.get('/', (req, res) => res.json({"message":"Ok"}));

// List all users
app.get('/api/users', (req, res) => {
    let sql = 'select * from users';
    let param = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(404).json({'error':err.message})
        }
    });
});

app.use((req, res) => {
    res.status(404);
});