const authController = require('./controllers/authController.js');
const userController = require('./controllers/userController.js');
const voteController = require('./controllers/voteController.js');

module.exports = (app) => {
    app.post('/callback', authController.authccxpCallback);
    app.post('/api/profile', authController.verifyServiceToken,
        userController.getProfile);
    app.post('/api/vote', authController.verifyServiceToken,
        voteController.vote);
};
