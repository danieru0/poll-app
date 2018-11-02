const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pollapp', {useNewUrlParser: true});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/poll');
routes(app);

let port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server running!'));
