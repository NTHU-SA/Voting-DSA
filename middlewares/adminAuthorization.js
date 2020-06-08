const Mongoose = require('mongoose');
const Users = Mongoose.model('users');

module.exports = async (req, res, next) => {
    try {
        const { _id: user_id, student_id } = req.user;
        const isAdmin = await Users.exists({_id: user_id, remark: 'admin'});
        if (!isAdmin) res.status(401).send('You are not admin');
        else await next();
    } catch (error) {
        res.status(401).send('Authorization failed');
    }
};
