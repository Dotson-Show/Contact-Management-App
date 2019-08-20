const express = require('express');
const app = express();

const http_port = 3000;

app.listen(http_port, () => {
    console.log(`Server running on port ${http_port}`);
});