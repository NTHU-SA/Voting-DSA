const Student = require('../models/student.js');
const VoteRecord = require('../models/voteRecord.js');

module.exports = {
    async vote(req, res) {
        const id = req.body.student_id;
        const candidateNumber = req.body.candidate_number;

        // TODO: check is student.id exist and student.isVote == 0
        // TODO: make it transaction
        // TODO: password used GUID + base64 to create
        await Student.create({id, isVote: 1});
        await VoteRecord.create({candidateNumber, password: 'abc'});
        res.status(200).send({status: true});
    },
};
