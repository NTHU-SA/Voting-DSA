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
// myid '6220c665f1ea57db22ac4307'
// test token 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTA5MDYyMzM1IiwiX2lkIjoiNjIyMGM2NjVmMWVhNTdkYjIyYWM0MzA3Iiwic3R1ZGVudF9pZCI6IjEwOTA2MjMzNSIsImlhdCI6MTY0NjMxNjgwMiwiZXhwIjoxNjQ2NDAzMjAyfQ.rAX-Zev6zoOKFsPlP6bL87iatGbCWNNBSYcOmqYAVck'
// web token 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiMTA5MDYyMzM1IiwiX2lkIjoiNjIyMGI4YWI3YWJhZDEyMTAwZjVkN2ZhIiwic3R1ZGVudF9pZCI6IjEwOTA2MjMzNSIsImNyZWF0ZWRfYXQiOiIyMDIyLTAzLTAzVDEyOjQ2OjM1LjgyNVoiLCJ1cGRhdGVkX2F0IjoiMjAyMi0wMy0wM1QxMjo0NjozNS44MjVaIiwiX192IjowLCJpYXQiOjE2NDYzMTE1OTUsImV4cCI6MTY0NjM5Nzk5NX0.zV5tTAIIAqP-WgD6jpCdQI8FZIZII-_rvTb4CAaDlmM'
// 100屆 id '6220d4977abad12100f5d7fb'
// 101屆 id '6220d4e17abad12100f5d7fc'

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

app.listen(
    config.serverPort,
    () => console.log(`Server is listening on port ${config.serverPort}.`));
