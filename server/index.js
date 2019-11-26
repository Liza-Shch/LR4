const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const http = require('http');
const port = process.env.PORT || 3000;
app.set('port', port);

const Controllers = require('../controllers');
const Middlewares = require('../middlewares');

app.get('/api', (_, res) => res.status(200).send({ message: 'Welcome to API!' }));
app.post('/api/post', Middlewares.Post.post, Controllers.Post.createPost);
app.get('/api/post/:idOrIdempotencyKey', Middlewares.Post.getPost, Controllers.Post.getPost);
app.put('/api/post', Middlewares.Post.post, Controllers.Post.updatePost);
app.put('/api/post/delete', Middlewares.Post.post, Controllers.Post.deletePost);

const server = http.createServer(app);
server.listen(port);
