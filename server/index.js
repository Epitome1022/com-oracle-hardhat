const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Commune Oracle Server is Running at http://localhost:${port}`);
})