module.exports = {
    exampleGet(req, res) {
        res.status(200).send({ status: true, message: "OK" });
    },

    examplePost(req, res) {
        res.status(200).send({ status: true, post_objects: req.body });
    },
};
