const authController = require('./controllers/authController.js');
const voteController = require('./controllers/voteController.js');

module.exports = (app) => {
    app.get('/api/example', authController.exampleGet);
    app.post('/api/example', authController.examplePost);
    app.post('/api/vote', voteController.vote);
};
