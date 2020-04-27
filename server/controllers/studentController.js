const {sequelize} = require('../models');
const {DataTypes} = require('sequelize');
const Student = require('../models/student.js')(sequelize, DataTypes);

module.exports = {
    async createStudent(req, res) {
        const studentId = req.body.student_id;
        const college = req.body.college;
        if (!studentId || !college) {
            res.status(400).send({status: false,
                error: 'post body student_id or college not given.'});
            return;
        }
        await Student.create({id: studentId, college});
        res.status(200).send({status: true});
    },
};
