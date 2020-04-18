const authController = require('./controllers/authController.js');

module.exports = (app) => {
    app.get('/api/example', authController.exampleGet);
    app.post('/api/example', authController.examplePost);
};
