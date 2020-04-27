const {sequelize} = require('../models');
const {DataTypes} = require('sequelize');
const Student = require('../models/student.js')(sequelize, DataTypes);
const VoteRecord = require('../models/voteRecord.js')(sequelize, DataTypes);
const IsVote = require('../models/isVote.js')(sequelize, DataTypes);

module.exports = {
    async vote(req, res) {
        const studentId = req.user;
        const activityName = req.body.activity_name;
        const voteAnswers = req.body.vote_answers;

        // TODO: make it transaction

        const studentResult = await Student.findAll({
            attributes: ['id'],
            where: {id: studentId},
        });
        if (studentResult.length === 0) {
            res.status(200).send({status: false,
                error: 'This student id is not allowed to vote.'});
            return;
        }

        const isvoteResult = await IsVote.findAll({
            attributes: ['studentId', 'activityName'],
            where: {studentId, activityName: activityName},
        });
        if (isvoteResult.length !== 0) {
            res.status(200).send({status: false,
                error: 'This student id has already vote.'});
            return;
        }

        const activityResult = await Activity.findAll({
            attributes: ['name'],
            where: {name: activityName},
        });
        if (activityResult.length === 0) {
            res.status(200).send({status: false,
                error: 'This activity not exists.'});
            return;
        }

        await IsVote.create({studentId, activityName});

        for (let i = 0; i < voteAnswers.length; i++) {
            await VoteRecord.create({
                activityName,
                question: voteAnswers[i].question,
                answer: voteAnswers[i].answer,
                password: 'abc',
            });
        }
        // TODO: password used GUID + base64 to create
        // TODO: password should rename to `token`
        res.status(200).send({status: true});
    },
};
