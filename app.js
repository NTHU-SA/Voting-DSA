require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const app = express();
const Mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_NAME } = process.env;

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_NAME}?authSource=admin&w=1`;
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_NAME}`;

Mongoose.connect(url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

//? Always set to true?
Mongoose.set('debug', true);

require('./models/users');
require('./models/votes');
require('./models/activities');
require('./models/options');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(fileUpload());

app.use(require('./router'));
app.use(express.static('./public'));

const port = process.env.PORT || 3000
app.listen(
    port,
    () => console.log(`Server is listening on port ${port}.`));
