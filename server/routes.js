const authController = require('./controllers/authController.js');
const userController = require('./controllers/userController.js');
const studentController = require('./controllers/studentController.js');
const voteController = require('./controllers/voteController.js');
const activityController = require('./controllers/activityController.js');

module.exports = (app) => {
    app.get('/callback', authController.authccxpCallback);
    app.post('/api/profile', authController.verifyServiceToken,
        userController.getProfile);
    app.post('/api/vote', authController.verifyServiceToken,
        voteController.vote);
    app.post('/api/student', studentController.createStudent);
    app.post('/api/activity', activityController.createActivity);
};
