const authController = require('./controllers/authController.js');
const users = require('./controllers/users');

const router = require('express').Router();

router.get('/callback', authController.authccxpCallback);
router.post('/users/addUser', users.addUser);
router.post('/users/getUser', users.getUser);
router.post('/users/getUsers', users.getUsers);
router.post('/users/modifyUser', users.modifyUser);
router.post('/users/removeUser', users.removeUser);

module.exports = router;
