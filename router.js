const authController = require('./controllers/authController.js');
const users = require('./controllers/users');
const votes = require('./controllers/votes');
const activities = require('./controllers/activities');
const options = require('./controllers/options');
const files = require('./controllers/files');
const authentication = require('./middlewares/authentication');
const adminAuthorization = require('./middlewares/adminAuthorization');

// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/callback', authController.authccxpCallback);
router.get('/auth/ccxp/captcha', authController.getccxpCaptchaImage);
router.post('/auth/ccxp', authController.authccxp);
router.get('/logout', authController.logout);

// users
router.post('/users/addUser', authentication, adminAuthorization, users.addUser);
router.post('/users/getUser', authentication, adminAuthorization, users.getUser);
router.post('/users/getUsers', authentication, adminAuthorization, users.getUsers);
router.post('/users/modifyUser', authentication, adminAuthorization, users.modifyUser);
router.post('/users/removeUser', authentication, adminAuthorization, users.removeUser);

// votes
router.post('/votes/addVote', authentication, votes.addVote);
router.post('/votes/getVote', authentication, votes.getVote);
router.post('/votes/getVotes', authentication, votes.getVotes);
// Deprecated: router.post('/votes/getVoteResult', votes.getVoteResult);
// No Need: router.post('/votes/modifyVote', votes.modifyVote);
router.post('/votes/removeVote', authentication, adminAuthorization, votes.removeVote);

// activities
router.post('/activities/addActivity', authentication, adminAuthorization, activities.addActivity);
router.post('/activities/getActivity', authentication, activities.getActivity);
router.post('/activities/getActivities', authentication, activities.getActivities);
router.post('/activities/getAvailableActivities', authentication, activities.getAvailableActivities);
router.post('/activities/modifyActivity', authentication, adminAuthorization, activities.modifyActivity);
router.post('/activities/removeActivity', authentication, adminAuthorization, activities.removeActivity);

// options
router.post('/options/addOption', authentication, adminAuthorization, options.addOption);
router.post('/options/getOption', authentication, options.getOption);
router.post('/options/getOptions', authentication, options.getOptions);
router.post('/options/modifyOption', authentication, adminAuthorization, options.modifyOption);
router.post('/options/removeOption', authentication, adminAuthorization, options.removeOption);

// files
router.post('/files/uploadFile', authentication, files.uploadFile);

module.exports = router;
