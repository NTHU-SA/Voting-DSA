const authController = require('./controllers/authController.js');
const users = require('./controllers/users');
const votes = require('./controllers/votes');
const activities = require('./controllers/activities');
const options = require('./controllers/options');
const files = require('./controllers/files');

// eslint-disable-next-line new-cap
const router = require('express').Router();

router.get('/callback', authController.authccxpCallback);
router.get('/auth/ccxp/captcha', authController.getccxpCaptchaImage);
router.post('/auth/ccxp', authController.authccxp);

// users
router.post('/users/getUser', authController.verifyServiceToken, users.getUser);
router.post('/users/addUser', users.addUser);
router.post('/users/getUser', users.getUser);
router.post('/users/getUsers', users.getUsers);
router.post('/users/modifyUser', users.modifyUser);
router.post('/users/removeUser', users.removeUser);

// votes
router.post('/votes/addVote', authController.verifyServiceToken, votes.addVote);
router.post('/votes/getVote', votes.getVote);
router.post('/votes/getVotes', votes.getVotes);
// Deprecated: router.post('/votes/getVoteResult', votes.getVoteResult);
// No Need: router.post('/votes/modifyVote', votes.modifyVote);
router.post('/votes/removeVote', votes.removeVote);

// activities
router.post('/activities/addActivity', activities.addActivity);
router.post('/activities/getActivity', activities.getActivity);
router.post('/activities/getActivities', activities.getActivities);
router.post('/activities/modifyActivity', activities.modifyActivity);
router.post('/activities/removeActivity', activities.removeActivity);

// options
router.post('/options/addOption', options.addOption);
router.post('/options/getOption', options.getOption);
router.post('/options/getOptions', options.getOptions);
router.post('/options/modifyOption', options.modifyOption);
router.post('/options/removeOption', options.removeOption);

// files
router.post('/files/uploadFile', files.uploadFile);

module.exports = router;
