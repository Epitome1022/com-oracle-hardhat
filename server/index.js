const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = process.env.PORT || 5000;

app.use(cors({origin:'*'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', routes);

app.listen(port, ()=> {
    console.log(`Commune Oracle Server is Running at http://localhost:${port}`);
})