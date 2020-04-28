require('dotenv').config({path: '.env.dev'});
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const app = express();
const Mongoose = require('mongoose');

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_NAME } = process.env;

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_NAME}?authSource=admin&w=1`;
Mongoose.connect(url, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
Mongoose.set('debug', true);

require('./models/users');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));

app.use(require('./router'));
app.use(express.static('./public'));

app.listen(config.serverPort,
    () => console.log(`Server is listening on port ${config.serverPort}.`));

// console.log(require('./libs/ccxpAuth.js').obtainServiceToken('107034549'));
