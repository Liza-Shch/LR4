const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const http = require('http');
const port = process.env.PORT || 3000;
app.set('port', port);

app.get('/api', (_, res) => res.status(200).send({ message: 'Welcome to API!' }));
const server = http.createServer(app);
server.listen(port);
