require('dotenv').config({path: '.env.dev'});
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));

require('./routes')(app);
app.use(express.static('../client'));

app.listen(config.serverPort,
    () => console.log(`Server is listening on port ${config.serverPort}.`));

console.log(require('./libs/ccxpAuth.js').obtainServiceToken('107034549'));
