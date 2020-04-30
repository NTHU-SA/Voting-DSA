
module.exports = {

    getProfile(req, res) {
        res.send({status: true, profile: req.user});
    },

};
