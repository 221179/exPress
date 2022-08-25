require('dotenv').config()
const express = require('express');
const app = express();
const Port = process.env.PORT;
const { Welcome } = require('./src/routes.js);

app.get('/', Welcome);

app.listen(Port, () => console.log(`
    server start to http://localhost:${Port}
`));